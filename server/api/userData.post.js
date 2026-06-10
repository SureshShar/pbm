export default defineEventHandler(async (event) => {
  try {
    const { id: userId } = await readBody(event);

    if (!userId) {
      return getErrorMessage(
        400,
        "Missing Payload data",
        sendError,
        createError,
        event
      );
    }

    const config = useRuntimeConfig();
    const [data] = await getDBPool(config).query(
      "SELECT page_data, email_id, contact_number, user_available, page_layout FROM users_page_data WHERE page_id = ?",
      [userId]
    );

    return {
      success: true,
      data: data[0],
    };
  } catch (err) {
    // console.log(err);
    return getErrorMessage(
      err.statusCode,
      err.statusMessage,
      sendError,
      createError,
      event
    );
  }
});

// In use