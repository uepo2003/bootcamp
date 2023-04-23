import {execQuery} from "../util/exec_query";
import fs from "node:fs";

const queriesForDropTables = fs
  .readFileSync("./db/drop_tables.sql", "utf8")
  .split("\n");

queriesForDropTables.forEach(async query => {
  await execQuery(query);
});

console.log("drop tables done");

const queriesForCreateTables = fs
  .readFileSync("./db/create_tables.sql", "utf8")
  .trim()
  .split(");")
  .slice(0, -1)
  .map(query => query + ");");

queriesForCreateTables.forEach(async query => {
  try {
    await execQuery(query);
  } catch (e) {
    console.log(e);
  }
});
