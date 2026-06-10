// Update all user meta info dynamically
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    const { pageId, authToken, updates = {} } = await readBody(event);

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

    // List of allowed fields that can be updated
    const allowedFields = [
      "page_id",
      "user_password",
      "user_name",
      "email_id",

      "contact_number",
      // "telegram_id",
      "user_available",
      "page_layout",

      "stars",
      "karma",
      "topup_start_at",
      "topup_end_at",
    ];

    // Filter only allowed fields that have values
    const fieldsToUpdate = {};
    Object.keys(updates).forEach((key) => {
      if (
        allowedFields.includes(key) &&
        updates[key] !== undefined &&
        updates[key] !== null &&
        updates[key] !== ""
      ) {
        fieldsToUpdate[key] = updates[key];
      }
    });

    
    // If no valid fields to update
    if (Object.keys(fieldsToUpdate).length === 0) {
      return getErrorMessage(
        400,
        "No valid fields to update",
        sendError,
        createError,
        event
      );
    }
    
    // Build dynamic SET clause
    const setClause = Object.keys(fieldsToUpdate).map((field) => `${field} = ?`).join(", ");
    
    // Prepare values array (update values + pageId)
    const values = [...Object.values(fieldsToUpdate), pageId];
    
    // Execute dynamic update
    await getDBPool(config).query(
      `UPDATE users_page_data SET ${setClause} WHERE page_id = ?`,
      values
    );

    return {
      success: true,
      message: "Fields updated successfully",
      data: {
        updatedFields: Object.keys(fieldsToUpdate),
      },
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

/**
  CREATE TABLE users_page_data (
    page_id VARCHAR(36) PRIMARY KEY,          # For page Id also primary key 1
    user_password VARCHAR(50) NOT NULL,       # 2
    user_name VARCHAR(30) NOT NULL,           # 3
    email_id VARCHAR(255) DEFAULT NULL,       # 4 Not compulsory
    contact_number VARCHAR(20) DEFAULT NULL,  # 5
    telegram_id VARCHAR(20) DEFAULT NULL,     # 6 No need form now
    page_data JSON DEFAULT NULL,              # 8
    stars INT UNSIGNED DEFAULT 1,             # 9
    karma INT DEFAULT 1,                      # 10
    created_at BIGINT UNSIGNED NOT NULL,      # JS Date.now()    11
    updated_at BIGINT UNSIGNED NULL,          # On updated  12
    last_login_at BIGINT UNSIGNED NULL,       # On login    13
    is_active BOOLEAN DEFAULT TRUE,
    topup_start_at BIGINT UNSIGNED NULL,      # JS Date.now() 14
    topup_end_at BIGINT UNSIGNED NULL,        # JS Date.now() 15

    # Index items so that easy search user
    INDEX idx_username_password (user_name, user_password)  
  ) ENGINE=InnoDB ROW_FORMAT=DYNAMIC CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
*/

