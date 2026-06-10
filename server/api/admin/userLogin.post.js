export default defineEventHandler(async (event) => {
  try {
    const { userName, password } = await readBody(event);

    // ✅ Validate required fields
    if (!userName || !password) {
      return getErrorMessage(
        400,
        "Missing required fields: pageId and authId",
        sendError,
        createError,
        event
      );
    }

    const [rows] = await getDBPool(useRuntimeConfig()).query(
      "SELECT page_id, created_at FROM users_page_data WHERE user_name = ? AND user_password = ?",
      [userName, password]
    );

    if (rows.length > 0) {
      return {
        success: true,
        data: { pageId: rows[0].page_id, authId: rows[0].created_at },
        statusCode: 200,
      };
    } else {
      return {
        success: true,
        data: null,
        statusCode: 200,
      };
    }
  } catch (err) {
    console.error("Error in onboarding POST handler:", err);
    return getErrorMessage(
      err.statusCode || 500,
      err.statusMessage || "Internal Server Error",
      sendError,
      createError,
      event
    );
  }
});

// In use 
