import { join, resolve } from "path";
import { mkdir, rename } from "fs/promises";
import { existsSync } from "fs";

function safePathSegment(value) {
  const v = String(value || "").trim();
  if (!v || v.includes("/") || v.includes("\\") || v.includes("..")) return null;
  return v.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export default defineEventHandler(async (event) => {
  const constants = getContants();

  try {
    const { fromPageId, toPageId, pageId1, pageId2 } = await readBody(event);
    const fromId = safePathSegment(fromPageId || pageId1);
    const toId = safePathSegment(toPageId || pageId2);

    if (!fromId || !toId) {
      return getErrorMessage(
        400,
        "fromPageId and toPageId are required",
        sendError,
        createError,
        event
      );
    }

    if (fromId === toId) {
      return {
        success: true,
        message: "No change (same pageId)",
        fromPageId: fromId,
        toPageId: toId,
      };
    }

    // const base = resolve(constants.UPLOAD_DIR) + sep;
    const fromDir = join(constants.UPLOAD_DIR, fromId);
    const toDir = join(constants.UPLOAD_DIR, toId);

    const fromResolved = resolve(fromDir);
    const toResolved = resolve(toDir);
    if (!fromResolved.startsWith(base) || !toResolved.startsWith(base)) {
      return getErrorMessage(400, "Invalid pageId", sendError, createError, event);
    }

    if (!existsSync(fromDir)) {
      return getErrorMessage(404, "Source folder not found", sendError, createError, event);
    }

    if (existsSync(toDir)) {
      return getErrorMessage(409, "Destination folder already exists", sendError, createError, event);
    }

    // ensure parent exists (usually base upload dir)
    await mkdir(constants.UPLOAD_DIR, { recursive: true });
    await rename(fromDir, toDir);

    return {
      success: true,
      message: "Folder renamed successfully",
      fromPageId: fromId,
      toPageId: toId,
    };
  } catch (err) {
    return getErrorMessage(
      err.statusCode || 500,
      err.message || "Internal server error",
      sendError,
      createError,
      event
    );
  }
});

