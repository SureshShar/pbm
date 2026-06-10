import OpenAI from "openai";

// ✅ Initialize OpenAI with OpenRouter details
const config = useRuntimeConfig();
const openai = new OpenAI({
  baseURL: config.aiBaseURL,
  apiKey: config.aiApiKey,
});

export default defineEventHandler(async (event) => {
  try {
    // ✅ Read and decode the request body (expects { data: string })
    const body = await readBody(event);
    const encoded = body?.data;
    if (!encoded) {
      return getErrorMessage(400, "Missing data", sendError, createError, event);
    }
    let userQuery;
    try {
      const decoded = JSON.parse(getClean(encoded));
      userQuery = decoded?.userQuery;
    } catch (e) {
      return getErrorMessage(400, "Invalid payload", sendError, createError, event);
    }

    // ✅ Validate required fields
    if (!userQuery) {
      return getErrorMessage(
        400,
        "Missing required payload",
        sendError,
        createError,
        event
      );
    }

    // ✅ Send request to OpenAI
    const response = await openai.chat.completions.create({
      model: config.aiModel,
      messages: userQuery, // e.g., [{role: "user", content: "Hello"}]
    });
    //   response_format: { type: "json_object" },

    if (!response?.choices?.length) {
      return {
        success: false,
        data: "No response from AI service",
      };
    }

    return {
      success: true,
      data: response.choices[0]?.message?.content,
    };
  } catch (err) {
    return getErrorMessage(
      err.statusCode || 500,
      err.statusMessage || "We are woking to fix AI assistant",
      sendError,
      createError,
      event
    );
  }
});

// In Use
