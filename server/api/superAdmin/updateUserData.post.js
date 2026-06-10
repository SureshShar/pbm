// Update user data for a specific or user
export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const { pageId, userData, authToken } = await readBody(event);

    if (!pageId || !userData) {
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

    await getDBPool (config).query(
      "UPDATE users_page_data SET page_data = ?, updated_at = ? WHERE page_id = ?",
      [JSON.stringify(userData), Date.now(), pageId]
    );

    return {
      success: true,
      statusCode: 200,
    };
  } catch (err) {
    return getErrorMessage(
      err.statusCode,
      err.statusMessage,
      sendError,
      createError,
      event
    );
  }
});

// In Use