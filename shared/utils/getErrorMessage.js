export default function (
  statusCode,
  statusMessage,
  sendError,
  createError,
  event
) {
  return sendError(
    event,
    createError({
      statusCode: statusCode || 500,
      statusMessage: statusMessage || "Our api fail to respond",
    })
  );
}
