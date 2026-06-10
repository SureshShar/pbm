export default defineEventHandler(async (event) => {
  try {
    const { pageId, userData, authId } = await readBody(event)

    if (!pageId || !authId || !userData) {
      return getErrorMessage(400, 'Missing Payload data', sendError, createError, event)
    }

    db.update(usersPageData)
      .set({ pageData: userData, updatedAt: Date.now() })
      .where(and(eq(usersPageData.pageId, pageId), eq(usersPageData.createdAt, Number(authId))))
      .run()

    return { success: true, statusCode: 200 }
  } catch (err) {
    return getErrorMessage(err.statusCode, err.statusMessage, sendError, createError, event)
  }
})

// In Use
