import { join, resolve } from "path";
// import { join, resolve, sep } from "path";
import { unlink } from "fs/promises";
// import { existsSync } from "fs";

export default defineEventHandler(async (event) => {
  const constants = getContants();

  try {
    const { filePath, authId, authToken } = await readBody(event);

    if (!filePath) {
      return getErrorMessage(
        400,
        "filePath is required",
        sendError,
        createError,
        event
      );
    }

    // Normalize incoming path remove any leading slashes and trim whitespace
    // const cleanedPath = filePath.trim().replace(/^\/+/, ""); 
    // removes starting slash

    // Absolute resolved paths
    // const absoluteUploadDir = resolve(constants.UPLOAD_DIR) + sep;
    const absoluteFilePath = resolve(join(constants.UPLOAD_DIR, filePath));

    // ✅ Security validation (prevent path traversal)
    // if (!absoluteFilePath.startsWith(absoluteUploadDir)) {
    //   return getErrorMessage(
    //     400,
    //     "Invalid file path",
    //     sendError,
    //     createError,
    //     event
    //   );
    // }

    // ✅ Check file exists
    // if (!existsSync(absoluteFilePath)) {
    //   return {
    //     success: false,
    //     message: "File not found",
    //   };
    // }

    // ✅ Delete file
    await unlink(absoluteFilePath);

    return {
      success: true,
      message: "File deleted successfully",
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