// Update user data for a specific or user
export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    const { pageId, userData, authToken } = await readBody(event)

    if (!pageId || !userData) {
      return getErrorMessage(400, 'Missing Payload data', sendError, createError, event)
    }

    if (authToken !== config.superAdminAuthToken) {
      return getErrorMessage(400, 'Invalid authToken', sendError, createError, event)
    }

    db.update(usersPageData)
      .set({ pageData: userData, updatedAt: Date.now() })
      .where(eq(usersPageData.pageId, pageId))
      .run()

    return { success: true, statusCode: 200 }
  } catch (err) {
    return getErrorMessage(err.statusCode, err.statusMessage, sendError, createError, event)
  }
})

// In Use
