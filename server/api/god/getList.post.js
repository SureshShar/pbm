export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    const { authToken, page = 1, limit = 20 } = await readBody(event)

    if (!authToken) {
      return getErrorMessage(400, 'Missing authToken', sendError, createError, event)
    }

    if (authToken !== config.superAdminAuthToken) {
      return getErrorMessage(400, 'Invalid authToken', sendError, createError, event)
    }

    const offset = (page - 1) * limit

    const { total } = db.select({ total: count() }).from(usersPageData).get()

    const rows = db
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
      .orderBy(desc(usersPageData.createdAt))
      .limit(limit)
      .offset(offset)
      .all()

    if (rows.length === 0) {
      return { success: true, data: [], statusCode: 200, message: 'No data found' }
    }

    return {
      success: true,
      data: rows,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
      statusCode: 200,
    }
  } catch (err) {
    return getErrorMessage(err.statusCode || 500, err.statusMessage || 'Internal Server Error', sendError, createError, event)
  }
})
