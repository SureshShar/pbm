export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    const { pageId, authToken } = await readBody(event);

    // Primary validation
    if (!pageId || !authToken) {
      return getErrorMessage(
        400,
        "Missing Payload data",
        sendError,
        createError,
        event
      );
    }

    // Validate authToken
    if (authToken !== config.superAdminAuthToken) {
      return getErrorMessage(
        400,
        "Invalid authToken",
        sendError,
        createError,
        event
      );
    }

    const [rows] = await getDBPool(config).query(
      "SELECT * FROM users_page_data WHERE page_id = ?",
      [pageId]
    );

    if (rows.length === 0) {
      return {
        success: false,
        data: null,
        statusCode: 200,
      };
    }

    return {
      success: true,
      data: rows[0],
      statusCode: 200,
    };
  } catch (err) {
    console.error("Error in dynamic update handler:", err);
    return getErrorMessage(
      err.statusCode || 500,
      err.statusMessage || "Internal Server Error",
      sendError,
      createError,
      event
    );
  }
});
