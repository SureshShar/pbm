// Update all user meta info dynamically
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    const { pageId, authToken, updates = {} } = await readBody(event)

    if (!pageId || !authToken) {
      return getErrorMessage(400, 'Missing Payload data', sendError, createError, event)
    }

    if (authToken !== config.superAdminAuthToken) {
      return getErrorMessage(400, 'Invalid authToken', sendError, createError, event)
    }

    // Maps original snake_case API field names → Drizzle camelCase column keys
    const FIELD_MAP = {
      page_id:        'pageId',
      user_password:  'userPassword',
      user_name:      'userName',
      email_id:       'emailId',
      contact_number: 'contactNumber',
      user_available: 'userAvailable',
      page_layout:    'pageLayout',
      stars:          'stars',
      karma:          'karma',
      topup_start_at: 'topupStartAt',
      topup_end_at:   'topupEndAt',
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

    db.update(usersPageData).set(setObj).where(eq(usersPageData.pageId, pageId)).run()

    return {
      success: true,
      message: 'Fields updated successfully',
      data: { updatedFields },
      statusCode: 200,
    }
  } catch (err) {
    console.error('Error in dynamic update handler:', err)
    return getErrorMessage(err.statusCode || 500, err.statusMessage || 'Internal Server Error', sendError, createError, event)
  }
})
