// Allowed file types
const MIME_TYPE = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
  pdf: "application/pdf",
};
const ALLOWED_MIME_TYPE = Object.values(MIME_TYPE);

export default function () {
  return {
    MAX_FILE_SIZE: 0.06 * 1024 * 1024, // File max size 60 Kb
    MAX_SIZE: "60 KB",
    UPLOAD_DIR: "/home/admin/apps/userAssets/upload/",
    ALLOWED_MIME_TYPE,
    MIME_TYPE,
    MAX_FILES: 5, // Max files allowed per upload
    DB_PATH: "/home/admin/apps/db/data/pbm.db", // Path to the SQLite database file
  };
}
