// server/api/get-user-query.get.js
export default defineEventHandler(async (event) => {
  try {
    const { pageId, authToken, authId } = await readBody(event);

    if (!pageId) {
      return getErrorMessage(
        400,
        "Missing payload data",
        sendError,
        createError,
        event
      );
    }

    const config = useRuntimeConfig();
    let data = null;

    if (authToken === config.superAdminAuthToken) { // Super Admin update
       data = await getDBPool(config).query(
          `SELECT user_query FROM users_page_data WHERE page_id = ?`,
          [pageId]
        );
    } else if (authId) { // Regular admin user_query
        data = await getDBPool(config).query(
          `SELECT user_query FROM users_page_data WHERE page_id = ? AND created_at = ?`,
          [pageId , authId ]
        );
    }

    return {
      success: true,
      data: data?.[0]?.[0]?.user_query || null
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