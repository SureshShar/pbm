export default function (data) {
  if(typeof data === "string") return btoa(unescape(encodeURIComponent(data)));
  return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
}
