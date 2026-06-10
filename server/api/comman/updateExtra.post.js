// Update all user meta info dynamically
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    const { pageId, authToken, authId, updates = {} } = await readBody(event);

    // Primary validation
    if (!pageId) {
      return getErrorMessage(
        400,
        "Missing Payload data",
        sendError,
        createError,
        event
      );
    }

    // Validate authToken
    if (authToken || authId) {
      // List of allowed fields that can be updated
      const allowedFields = [
        "email_id",
        "contact_number",
        // "telegram_id",
        "user_available",
        "page_layout",
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

      // console.log("Updating fields:", authToken, config.superAdminAuthToken, authId, pageId, fieldsToUpdate);
      if (authToken === config.superAdminAuthToken) { // Super Admin update
        await getDBPool(config).query(
          `UPDATE users_page_data SET ${setClause} WHERE page_id = ?`,
          values
        );
      } else if (authId) { // Regular admin user update
        await getDBPool(config).query(
          `UPDATE users_page_data SET ${setClause} WHERE page_id = ? AND created_at = ?`,
          [ ...values , authId ]
        );
      }

      return {
        success: true,
        message: "Fields updated successfully",
        data: {
          updatedFields: Object.keys(fieldsToUpdate),
        },
        statusCode: 200,
      };
    } else {
      return getErrorMessage(
        400,
        "Invalid authToken",
        sendError,
        createError,
        event
      );
    }
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
