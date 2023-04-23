import mysql from "mysql2/promise";
import {QueryOptions} from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const execQuery = async (query: string, values?: any): Promise<any> => {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
    database: "sns",
  });

  return connection.query(query, values).finally(() => {
    connection.end();
  });
};

const MAX_RECORDS_FOR_BULK_INSERT = 1000;

export const insertRecords = async (options: QueryOptions): Promise<void> => {
  const {values} = options;

  if (values.length < MAX_RECORDS_FOR_BULK_INSERT) {
    await execQuery(options.sql, [values]);
    return;
  }

  const loopCount = values.length / MAX_RECORDS_FOR_BULK_INSERT;
  for (let i = 0; i < loopCount; i++) {
    await execQuery(options.sql, [
      values.slice(
        i * MAX_RECORDS_FOR_BULK_INSERT,
        (i + 1) * MAX_RECORDS_FOR_BULK_INSERT
      ),
    ]);
  }
};
