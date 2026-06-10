import { join } from "path";
import { readdir } from "fs/promises";
import { existsSync } from "fs";

export default defineEventHandler(async (event) => {
  const constants = getContants();

  try {
    const { pageId, authId, authToken } = await readBody(event);

    if (!pageId) {
      return getErrorMessage(
        400,
        "pageId is required",
        sendError,
        createError,
        event
      );
    }

    const dir = join(constants.UPLOAD_DIR, pageId);
    if (!existsSync(dir)) {
      return {
        success: true,
        pageId,
        files: [],
      };
    }

    const entries = await readdir(dir, { withFileTypes: true });
    const files = entries.filter((e) => e.isFile()).map((e) => e.name).sort((a, b) => a.localeCompare(b));

    return {
      success: true,
      data: files.map((name) => `${pageId}/${name}`),
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