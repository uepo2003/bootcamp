import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const main = async (): Promise<void> => {
  try {
    await mysql.createConnection({
      host: "127.0.0.1",
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
      database: "sns",
    });
    console.log("Connection successful!");
    process.exit(0)
  } catch (error) {
    console.error(error);
    process.exit(1)
  }
};

main();
