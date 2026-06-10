export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    const { pageId, authToken } = await readBody(event)

    if (!pageId || !authToken) {
      return getErrorMessage(400, 'Missing Payload data', sendError, createError, event)
    }

    if (authToken !== config.superAdminAuthToken) {
      return getErrorMessage(400, 'Invalid authToken', sendError, createError, event)
    }

    const row = db
      .select({
        page_id:        usersPageData.pageId,
        user_password:  usersPageData.userPassword,
        user_name:      usersPageData.userName,
        email_id:       usersPageData.emailId,
        contact_number: usersPageData.contactNumber,
        telegram_id:    usersPageData.telegramId,
        user_available: usersPageData.userAvailable,
        page_layout:    usersPageData.pageLayout,
        user_query:     usersPageData.userQuery,
        user_assets:    usersPageData.userAssets,
        page_data:      usersPageData.pageData,
        stars:          usersPageData.stars,
        karma:          usersPageData.karma,
        created_at:     usersPageData.createdAt,
        updated_at:     usersPageData.updatedAt,
        last_login_at:  usersPageData.lastLoginAt,
        is_active:      usersPageData.isActive,
        topup_start_at: usersPageData.topupStartAt,
        topup_end_at:   usersPageData.topupEndAt,
      })
      .from(usersPageData)
      .where(eq(usersPageData.pageId, pageId))
      .get()

    if (!row) {
      return { success: false, data: null, statusCode: 200 }
    }

    return { success: true, data: row, statusCode: 200 }
  } catch (err) {
    console.error('Error in dynamic update handler:', err)
    return getErrorMessage(err.statusCode || 500, err.statusMessage || 'Internal Server Error', sendError, createError, event)
  }
})
