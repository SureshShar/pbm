export default defineEventHandler(async (event) => {
  try {
    const { id: userId } = await readBody(event)

    if (!userId) {
      return getErrorMessage(400, 'Missing Payload data', sendError, createError, event)
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
      .where(eq(usersPageData.pageId, userId))
      .get()

    return { success: true, data: row }
  } catch (err) {
    return getErrorMessage(err.statusCode, err.statusMessage, sendError, createError, event)
  }
})

// In use
