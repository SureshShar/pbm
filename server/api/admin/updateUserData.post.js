export default defineEventHandler(async (event) => {
  try {
    const { pageId, userData, authId } = await readBody(event);

    if (!pageId || !authId || !userData) {
      return getErrorMessage(
        400,
        "Missing Payload data",
        sendError,
        createError,
        event
      );
    }

    const config = useRuntimeConfig();
    await getDBPool (config).query(
      "UPDATE users_page_data SET page_data = ?, updated_at = ? WHERE page_id = ? AND created_at = ?",
      [JSON.stringify(userData), Date.now(), pageId, authId]
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