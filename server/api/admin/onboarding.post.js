export default defineEventHandler(async (event) => {
  try {
    const { userId, email, password, userName, createdAt, pageData } = await readBody(event)

    if (!userId || !userName || !createdAt || !pageData || !password) {
      return getErrorMessage(400, 'Missing required fields: category, email, or createdAt', sendError, createError, event)
    }

    db.insert(usersPageData).values({
      pageId: userId,
      emailId: email,
      userPassword: password,
      userName: userName,
      pageData: pageData,
      createdAt: createdAt,
    }).run()

    return { success: true, data: { pageId: userId, authId: createdAt }, statusCode: 200 }
  } catch (err) {
    console.error('Error in onboarding POST handler:', err)
    return getErrorMessage(err.statusCode || 500, err.statusMessage || 'Internal Server Error', sendError, createError, event)
  }
})

// In use
