// server/api/delete-user-query-key.post.js
export default defineEventHandler(async (event) => {
  try {
    const { pageId, authToken, authId, key } = await readBody(event);

    if (!pageId || !key) {
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
          `UPDATE users_page_data SET user_query = JSON_REMOVE(COALESCE(user_query, '{}'), ?) WHERE page_id = ?`,
          [`$.${key}`, pageId]
        );
    } else if (authId) { // Regular admin user_query
        data = await getDBPool(config).query(
          `UPDATE users_page_data SET user_query = JSON_REMOVE(COALESCE(user_query, '{}'), ?) WHERE page_id = ? AND created_at = ?`,
          [`$.${key}`, pageId, authId]
        );
    }

    return {
      success: true,
      message: `Key '${key}' deleted successfully`,
      deleted: data,
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