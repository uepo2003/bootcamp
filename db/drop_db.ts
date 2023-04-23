import {execQuery} from "../util/exec_query";
import fs from "node:fs";

const queriesForDropTables = fs
  .readFileSync("./db/drop_tables.sql", "utf8")
  .replace(/\r\n|\n|\r/g, "")
  .split(";")
  .slice(0, -1);

(async () => {
  for (let i = 0; i < queriesForDropTables.length; i++) {
    await execQuery(queriesForDropTables[i]);
  }
})();

console.log("drop tables done");
