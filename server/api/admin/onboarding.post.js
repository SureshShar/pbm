export default defineEventHandler(async (event) => {
  try {
    const { userId, email, password, userName, createdAt, pageData } = await readBody(event);

    // ✅ Validate required fields
    if (!userId || !userName || !createdAt || !pageData || !password) {
      return getErrorMessage(
        400,
        "Missing required fields: category, email, or createdAt",
        sendError,
        createError,
        event
      );
    }

    await getDBPool(useRuntimeConfig()).query(
      "INSERT INTO users_page_data (page_id, email_id, user_password, user_name, page_data, created_at) VALUES (?, ?, ?, ?, ?, ?)",
      [userId, email, password, userName, JSON.stringify(pageData), createdAt]
    );

    return {
      success: true,
      data: { pageId: userId, authId: createdAt },
      statusCode: 200,
    };
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
