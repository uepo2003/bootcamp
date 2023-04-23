import fs from "node:fs";
import {execQuery} from "../util/exec_query";
import path from "path";
import zlib from "zlib";

const gzipFileNames = fs
  .readdirSync(path.resolve(__dirname, "data"))
  .filter(filename => filename.endsWith(".gz"));

(async () => {
  for (let j = 0; j < gzipFileNames.length; j++) {
    const filename = gzipFileNames[j];
    const queries = zlib
      .gunzipSync(fs.readFileSync(path.resolve(__dirname, "data", filename)))
      .toString("utf-8")
      .trim()
      .split(");")
      .slice(0, -1)
      .map(query => query + ");");

    console.log(`${filename}: start`);
    for (let i = 0; i < queries.length; i++) {
      await execQuery(queries[i]);
    }

    console.log(`${filename}: end`);
  }
})();
