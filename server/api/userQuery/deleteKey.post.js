// Replaces MySQL JSON_REMOVE — fetch → delete key in JS → write back
export default defineEventHandler(async (event) => {
  try {
    const { pageId, authToken, authId, key } = await readBody(event)

    if (!pageId || !key) {
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

    if (row) {
      const current = row.userQuery ?? {}
      delete current[key]
      db.update(usersPageData).set({ userQuery: current }).where(eq(usersPageData.pageId, pageId)).run()
    }

    return {
      success: true,
      message: `Key '${key}' deleted successfully`,
    }
  } catch (err) {
    return getErrorMessage(err.statusCode || 500, err.message || 'Internal server error', sendError, createError, event)
  }
})
