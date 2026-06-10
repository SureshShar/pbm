export default defineEventHandler(async (event) => {
  try {
    const { pageId, authId } = await readBody(event)

    if (!pageId || !authId) {
      return getErrorMessage(400, 'Missing required fields: pageId and authId', sendError, createError, event)
    }

    const row = db
      .select({
        page_data:      usersPageData.pageData,
        email_id:       usersPageData.emailId,
        contact_number: usersPageData.contactNumber,
        user_available: usersPageData.userAvailable,
        page_layout:    usersPageData.pageLayout,
      })
      .from(usersPageData)
      .where(and(eq(usersPageData.pageId, pageId), eq(usersPageData.createdAt, Number(authId))))
      .get()

    return { success: true, data: row ?? null, statusCode: 200 }
  } catch (err) {
    console.error('Error in getAdminUserData POST handler:', err)
    return getErrorMessage(err.statusCode || 500, err.statusMessage || 'Internal Server Error', sendError, createError, event)
  }
})

// In use
