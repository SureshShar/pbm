export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    const { authToken, page = 1, limit = 20 } = await readBody(event);

    // Primary validation
    if (!authToken) {
      return getErrorMessage(
        400,
        "Missing authToken",
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

    const offset = (page - 1) * limit;

    // Get total count for pagination
    const [countResult] = await getDBPool(config).query(
      "SELECT COUNT(*) as total FROM users_page_data"
    );
    const total = countResult[0].total;

    // Get paginated data
    const [rows] = await getDBPool(config).query(
      "SELECT * FROM users_page_data ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [limit, offset]
    );

    if (rows.length === 0) {
      return {
        success: true,
        data: [],
        statusCode: 200,
        message: "No data found"
      };
    }

    return {
      success: true,
      data: rows,
      total: total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
      statusCode: 200
    };
  } catch (err) {
    return getErrorMessage(
      err.statusCode || 500,
      err.statusMessage || "Internal Server Error",
      sendError,
      createError,
      event
    );
  }
});