// server/api/update-user-query-example.post.js
export default defineEventHandler(async (event) => {
  try {
    const { pageId, key, value } = await readBody(event);

    if (!pageId || !key || !value) {
      return getErrorMessage(
        400,
        "Missing payload data",
        sendError,
        createError,
        event
      );
    }

    const config = useRuntimeConfig();

    const [result] = await getDBPool(config).query(
      `UPDATE users_page_data SET user_query = JSON_SET(COALESCE(user_query, '{}'), ?, ?) WHERE page_id = ?`, 
      [`$.${key}`, value, pageId]
    );

    return {
      success: true,
      message: "User query updated successfully",
      pageId,
      data: result
    };

  } catch (err) {
    console.error("Error in update-user-query:", err);
    return getErrorMessage(
      err.statusCode || 500,
      err.message || "Internal server error",
      sendError,
      createError,
      event
    );
  }
});