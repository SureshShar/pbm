// Update user meta info dynamically
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    const { pageId, authToken, authId, updates = {} } = await readBody(event)

    if (!pageId) {
      return getErrorMessage(400, 'Missing Payload data', sendError, createError, event)
    }

    if (!authToken && !authId) {
      return getErrorMessage(400, 'Invalid authToken', sendError, createError, event)
    }

    const FIELD_MAP = {
      email_id:       'emailId',
      contact_number: 'contactNumber',
      user_available: 'userAvailable',
      page_layout:    'pageLayout',
    }

    const setObj = {}
    const updatedFields = []
    for (const [field, value] of Object.entries(updates)) {
      const col = FIELD_MAP[field]
      if (col && value !== undefined && value !== null && value !== '') {
        setObj[col] = value
        updatedFields.push(field)
      }
    }

    if (updatedFields.length === 0) {
      return getErrorMessage(400, 'No valid fields to update', sendError, createError, event)
    }

    if (authToken === config.superAdminAuthToken) {
      db.update(usersPageData).set(setObj).where(eq(usersPageData.pageId, pageId)).run()
    } else if (authId) {
      db.update(usersPageData).set(setObj)
        .where(and(eq(usersPageData.pageId, pageId), eq(usersPageData.createdAt, Number(authId))))
        .run()
    }

    return {
      success: true,
      message: 'Fields updated successfully',
      data: { updatedFields },
      statusCode: 200,
    }
  } catch (err) {
    return getErrorMessage(err.statusCode || 500, err.statusMessage || 'Internal Server Error', sendError, createError, event)
  }
})
