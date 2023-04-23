import fs from "node:fs";
import {execQuery} from "../util/exec_query";

const queriesForCreateTables = fs
  .readFileSync("./db/create_tables.sql", "utf8")
  .replace(/\r/g, "")
  .split(";")
  .slice(0, -1);

(async () => {
  for (let i = 0; i < queriesForCreateTables.length; i++) {
    await execQuery(queriesForCreateTables[i]);
  }
})();

console.log("create tables done");
