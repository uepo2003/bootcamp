import {RowDataPacket} from "mysql2";
import {execQuery} from "../util/exec_query";

test("setup sns detabase", async () => {
  const result = (await execQuery("show tables")) as RowDataPacket[][];
  const tables = result[0].map((row) => row["Tables_in_sns"]);

  const expectTables = [
    "comments",
    "follows",
    "likes",
    "post_tags",
    "posts",
    "settings",
    "tags",
    "users",
  ]

  for(const table of expectTables) {
    expect(tables.includes(table)).toBeTruthy()
  }
});
