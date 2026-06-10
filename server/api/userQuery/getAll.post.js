export default defineEventHandler(async (event) => {
  try {
    const { pageId, authToken, authId } = await readBody(event)

    if (!pageId) {
      return getErrorMessage(400, 'Missing payload data', sendError, createError, event)
    }

    const config = useRuntimeConfig()
    let row = null

    if (authToken === config.superAdminAuthToken) {
      row = db.select({ userQuery: usersPageData.userQuery }).from(usersPageData)
        .where(eq(usersPageData.pageId, pageId)).get()
    } else if (authId) {
      row = db.select({ userQuery: usersPageData.userQuery }).from(usersPageData)
        .where(and(eq(usersPageData.pageId, pageId), eq(usersPageData.createdAt, Number(authId)))).get()
    }

    return { success: true, data: row?.userQuery ?? null }
  } catch (err) {
    return getErrorMessage(err.statusCode || 500, err.message || 'Internal server error', sendError, createError, event)
  }
})
