// Replaces MySQL JSON_SET — fetch → mutate in JS → write back
export default defineEventHandler(async (event) => {
  try {
    const { pageId, key, value } = await readBody(event)

    if (!pageId || !key || !value) {
      return getErrorMessage(400, 'Missing payload data', sendError, createError, event)
    }

    const row = db.select({ userQuery: usersPageData.userQuery }).from(usersPageData)
      .where(eq(usersPageData.pageId, pageId)).get()

    const current = row?.userQuery ?? {}
    current[key] = value

    db.update(usersPageData)
      .set({ userQuery: current })
      .where(eq(usersPageData.pageId, pageId))
      .run()

    return {
      success: true,
      message: 'User query updated successfully',
      pageId,
    }
  } catch (err) {
    console.error('Error in update-user-query:', err)
    return getErrorMessage(err.statusCode || 500, err.message || 'Internal server error', sendError, createError, event)
  }
})
