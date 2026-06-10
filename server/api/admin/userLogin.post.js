export default defineEventHandler(async (event) => {
  try {
    const { userName, password } = await readBody(event)

    if (!userName || !password) {
      return getErrorMessage(400, 'Missing required fields: pageId and authId', sendError, createError, event)
    }

    const row = db
      .select({ page_id: usersPageData.pageId, created_at: usersPageData.createdAt })
      .from(usersPageData)
      .where(and(eq(usersPageData.userName, userName), eq(usersPageData.userPassword, password)))
      .get()

    if (row) {
      return { success: true, data: { pageId: row.page_id, authId: row.created_at }, statusCode: 200 }
    } else {
      return { success: true, data: null, statusCode: 200 }
    }
  } catch (err) {
    console.error('Error in userLogin POST handler:', err)
    return getErrorMessage(err.statusCode || 500, err.statusMessage || 'Internal Server Error', sendError, createError, event)
  }
})

// In use
