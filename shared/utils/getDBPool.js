import mysql from "mysql2/promise";

let mysqlPool;

// Create a MySQL connection pool
// Read about it here https://sidorares.github.io/node-mysql2/docs/examples/connections/create-pool
export default function getDBPool(config) {
  // console.log("******", config)
  if (!mysqlPool) {
    mysqlPool = mysql.createPool({
      host: config.mysqlHost,
      user: config.mysqlUser,
      password: config.mysqlPassword,
      database: config.mysqlDatabase,
      port: config.mysqlPort,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  mysqlPool.on("error", (err) => {
    console.error("MySQL Pool Error:", err);
  });

  return mysqlPool;
}
