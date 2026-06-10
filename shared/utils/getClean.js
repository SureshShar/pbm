export default function (dirtyString) {
  return decodeURIComponent(escape(atob(dirtyString)));
}
