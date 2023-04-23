import {execQuery} from "../util/exec_query";
import fs from "node:fs";

describe("writeQuery", () => {
  describe("question1", () => {
    test("query result should match csv", async () => {
      const query = fs.readFileSync("./sql/write_query/question1.sql", "utf8");
      const [queryRows] = await execQuery(query, []);

      const csv = fs
        .readFileSync(
          "./__tests__/answers/answer_data_for_question1.csv",
          "utf8"
        )
        .trim();

      const csvRows = csv.split("\n").slice(1);
      const csvData = csvRows.map(row => row);
      const queryResult = queryRows.map((row: {email: string}) => row.email);
      expect(queryResult).toEqual(csvData);
    });
  });

  describe("question2", () => {
    test("query result should match csv", async () => {
      const query = fs.readFileSync("./sql/write_query/question2.sql", "utf8");
      const [queryRows] = await execQuery(query, []);

      const csv = fs
        .readFileSync(
          "./__tests__/answers/answer_data_for_question2.csv",
          "utf8"
        )
        .trim();
      const csvRows = csv.split("\n").slice(1);

      const csvData = csvRows.map(row => {
        const [fullname, content, commentedAt] = row.split(",");
        return [fullname, content, new Date(commentedAt)];
      });

      const queryResult = queryRows.map(
        (row: {fullname: string; content: string; commented_at: string}) => [
          row.fullname,
          row.content,
          row.commented_at,
        ]
      );

      expect(queryResult).toEqual(csvData);
    });
  });

  describe("question3", () => {
    test("query result should match csv", async () => {
      const query = fs.readFileSync("./sql/write_query/question3.sql", "utf8");
      const [queryRows] = await execQuery(query, []);

      const csv = fs
        .readFileSync(
          "./__tests__/answers/answer_data_for_question3.csv",
          "utf8"
        )
        .trim();
      const csvRows = csv.split("\n").slice(1);

      const csvData = csvRows.map(row => {
        const [postId, likesCount] = row.split(",");
        return [Number(postId), Number(likesCount)];
      });
      const queryResult = queryRows.map(
        (row: {post_id: number; likes_count: number}) => [
          row.post_id,
          row.likes_count,
        ]
      );
      expect(queryResult).toEqual(csvData);
    });
  });

  describe("question4", () => {
    test("query result should match csv", async () => {
      const query = fs.readFileSync("./sql/write_query/question4.sql", "utf8");
      const [queryRows] = await execQuery(query, []);

      const csv = fs
        .readFileSync(
          "./__tests__/answers/answer_data_for_question4.csv",
          "utf8"
        )
        .trim();
      const csvRows = csv.split("\n").slice(1);

      const csvData = csvRows.map(row => {
        const [tagName] = row.split(",");
        return [tagName];
      });
      const queryResult = queryRows.map((row: {tag_name: string}) => [row.tag_name]);
      expect(queryResult).toEqual(csvData);
    });
  });

  describe("question5", () => {
    test("query result should match csv", async () => {
      const query = fs.readFileSync("./sql/write_query/question5.sql", "utf8");
      const [queryRows] = await execQuery(query, []);

      const csv = fs
        .readFileSync(
          "./__tests__/answers/answer_data_for_question5.csv",
          "utf8"
        )
        .trim();
      const csvRows = csv.split("\n").slice(1);

      const csvData = csvRows.map(row => {
        const [tagName, postsCount] = row.split(",");
        return [tagName, Number(postsCount)];
      });
      const queryResult = queryRows.map(
        (row: {tag_name: string; posts_count: number}) => [
          row.tag_name,
          row.posts_count,
        ]
      );
      expect(queryResult).toEqual(csvData);
    });
  });

  describe("question6", () => {
    test("query result should match csv", async () => {
      const query = fs.readFileSync("./sql/write_query/question6.sql", "utf8");
      const [queryRows] = await execQuery(query, []);

      const csv = fs
        .readFileSync(
          "./__tests__/answers/answer_data_for_question6.csv",
          "utf8"
        )
        .trim();

      const csvRows = csv.split("\n").slice(1);

      const csvData = csvRows.map(row => {
        const [userId, fullName] = row.split(",");
        return [Number(userId), fullName];
      });

      const queryResult = queryRows.map(
        (row: {user_id: number; full_name: string}) => [
          row.user_id,
          row.full_name,
        ]
      );

      expect(queryResult).toEqual(csvData);
    });
  });

  describe("question7", () => {
    test("query result should match csv", async () => {
      const query = fs.readFileSync("./sql/write_query/question7.sql", "utf8");
      const [queryRows] = await execQuery(query, []);

      const csv = fs
        .readFileSync(
          "./__tests__/answers/answer_data_for_question7.csv",
          "utf8"
        )
        .trim();
      const csvRows = csv.split("\n").slice(1);

      const csvData = csvRows.map(row => {
        const [userId, latestPostContent] = row.split(",");
        return [Number(userId), latestPostContent];
      });
      const queryResult = queryRows.map(
        (row: {user_id: number; latest_post_content: number}) => [
          row.user_id,
          row.latest_post_content,
        ]
      );
      expect(queryResult).toEqual(csvData);
    });
  });
});
