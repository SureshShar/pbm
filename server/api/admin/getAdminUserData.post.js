export default defineEventHandler(async (event) => {
  try {
    const { pageId, authId } = await readBody(event);

    // ✅ Validate required fields
    if (!pageId || !authId) {
      return getErrorMessage(
        400,
        "Missing required fields: pageId and authId",
        sendError,
        createError,
        event
      );
    }

    const [rows] = await getDBPool(useRuntimeConfig()).query(
      "SELECT page_data, email_id, contact_number, user_available, page_layout FROM users_page_data WHERE page_id = ? AND created_at = ?",
      [pageId, authId]
    );

    if (rows.length > 0) {
      return {
        success: true,
        data: rows[0],
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