import { ofetch } from "ofetch";

// const chatId = 5681695474; me
// const chatId = 763530300; manoj

export default defineEventHandler(async (event) => {
  const { telegramBotToken } = useRuntimeConfig();
  const body = await readBody(event);

  if (!body?.data) {
    return getErrorMessage(400, "Missing data", sendError, createError, event);
  }

  let chatId, message;
  try {
    const { chatId: id, message: msg } = JSON.parse(getClean(body.data));
    chatId = id;
    message = msg;
  } catch {
    return getErrorMessage(
      400,
      "Invalid payload",
      sendError,
      createError,
      event
    );
  }

  if (!chatId || !message) {
    return getErrorMessage(
      400,
      "Missing chatId or message",
      sendError,
      createError,
      event
    );
  }

  try {
    await ofetch(
      `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
      {
        method: "POST",
        body: { chat_id: chatId, text: message, parse_mode: "Markdown" },
      }
    );

    return { success: true };
  } catch (err) {
    return getErrorMessage(
      err.statusCode || 500,
      err.statusMessage || "Telegram API error",
      sendError,
      createError,
      event
    );
  }
});

// In use
