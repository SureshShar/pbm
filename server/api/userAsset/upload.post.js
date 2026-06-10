// server/api/upload.post.ts
import { join } from "path";
// import { join, resolve, sep } from "path";
import { mkdir, writeFile } from "fs/promises";

function getUserId(type = "complex", length = 4) {
  const charsComplex = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
  const charsSimple = "abcdefghijklmnpqrstuvwxyz123456789"
  const chars = type === "complex" ? charsComplex : charsSimple

  return [...Array(length)].map(() => chars[Math.floor(Math.random() * chars.length)]).join("")
}

// function safePathSegment(value) {
//   const v = String(value || "").trim();
//   // keep it simple: folders should not contain path separators
//   if (!v || v.includes("/") || v.includes("\\") || v.includes("..")) return null;
//   return v.replace(/[^a-zA-Z0-9._-]/g, "_");
// }

export default defineEventHandler(async (event) => {
  const constants = getContants()

  try {
    const parts = await readMultipartFormData(event)

    // 🔑 get pageId
    const userIdPart = parts.find((part) => !part.filename && part.name === 'pageId')
    const pageId = userIdPart?.data?.toString()
    // const pageId = safePathSegment(pageIdRaw)

    if (!pageId) {
      return getErrorMessage(
        400,
        "pageId is required in form data",
        sendError,
        createError,
        event
      )
    }

    // 📁 ensure user upload directory exists
    const userUploadDir = join(constants.UPLOAD_DIR, pageId)
    await mkdir(userUploadDir, { recursive: true })

    const results = []
    const writePromises = []
    const imageid = getUserId()

    for (const part of parts) {
      if (!part.filename) continue

      const safeName = String(part.filename).replace(/[^a-zA-Z0-9.-]/g, "_")
      const uniqueFilename = `${imageid}-${safeName}`

      const filePath = join(userUploadDir, uniqueFilename)
      // const resolved = resolve(filePath)
      // const baseResolved = resolve(userUploadDir) + sep
      // if (!resolved.startsWith(baseResolved)) {
      //   return getErrorMessage(400, "Invalid filename", sendError, createError, event)
      // }

      writePromises.push(writeFile(filePath, part.data))
      results.push(`${pageId}/${uniqueFilename}`)
    }

    await Promise.all(writePromises)

    return {
      success: true,
      message: 'Files uploaded successfully',
      data: results
    }

  } catch (error) {
    return getErrorMessage(
      400,
      "upload failed: " + error.message,
      sendError,
      createError,
      event
    )
  }
})