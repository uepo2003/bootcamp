import {faker} from "@faker-js/faker";
import {insertRecords} from "../util/exec_query";

const NUMBER_OF_USERS = 10000;
const NUMBER_OF_POSTS = 100000;
const NUMBER_OF_FOLLOWS = 1000000;
const NUMBER_OF_COMMENTS = 1000000;
const NUMBER_OF_LIKES = 1000000;
const NUMBER_OF_TAGS = 100000;
const NUMBER_OF_POST_TAGS = 1000000;

const main = async (): Promise<void> => {
  // insert users
  const users = [];
  for (let i = 1; i <= NUMBER_OF_USERS; i++) {
    users.push([
      i,
      faker.word.noun() + i + "@example.com",
      faker.internet.password(20),
      faker.name.firstName(),
      faker.name.lastName(),
      faker.date.between(
        "2023-01-01T00:00:00.000Z",
        "2023-02-01T00:00:00.000Z"
      ),
    ]);
  }
  await insertRecords({
    sql: "insert into users(id, email, password, first_name, last_name, registered_at) values ?",
    values: users,
  });
  console.log("insert users done");

  // insert settings
  const settings = [];
  for (let i = 1; i <= NUMBER_OF_USERS; i++) {
    settings.push([i, faker.datatype.boolean(), faker.datatype.boolean()]);
  }
  await insertRecords({
    sql: "insert into settings(user_id, is_send_email, is_send_push_notification) values ?",
    values: settings,
  });
  console.log("insert settings done");

  // insert posts
  const posts = [];
  for (let i = 1; i <= NUMBER_OF_POSTS; i++) {
    posts.push([
      i,
      faker.datatype.number({min: 1, max: NUMBER_OF_USERS}),
      faker.lorem.paragraph(),
      faker.date.between(
        "2023-02-01T00:00:00.000Z",
        "2023-03-01T00:00:00.000Z"
      ),
    ]);
  }

  await insertRecords({
    sql: "insert into posts(id, user_id, content, posted_at) values ?",
    values: posts,
  });
  console.log("insert posts done");

  // insert tags
  const tags = [];
  for (let i = 1; i <= NUMBER_OF_TAGS; i++) {
    tags.push([i, faker.word.noun() + i]);
  }

  await insertRecords({
    sql: "insert into tags(id, name) values ?",
    values: tags,
  });
  console.log("insert tags done");

  // insert follows
  const follows: Array<[number, number]> = [];
  for (let i = 0; i < NUMBER_OF_FOLLOWS; i++) {
    follows.push([
      faker.datatype.number({min: 1, max: NUMBER_OF_USERS}),
      faker.datatype.number({min: 1, max: NUMBER_OF_USERS}),
    ]);
  }

  const uniqueFollows = Array.from(
    new Set(follows.map(follow => JSON.stringify(follow)))
  ).map(follow => JSON.parse(follow));

  await insertRecords({
    sql: "insert into follows(following_id, follower_id) values ?",
    values: uniqueFollows,
  });
  console.log("insert follows done");

  // insert likes
  const likes = [];
  for (let i = 0; i < NUMBER_OF_LIKES; i++) {
    likes.push([
      faker.datatype.number({min: 1, max: NUMBER_OF_USERS}),
      faker.datatype.number({min: 1, max: NUMBER_OF_POSTS}),
    ]);
  }

  const uniqueLikes = Array.from(
    new Set(likes.map(like => JSON.stringify(like)))
  ).map(like => JSON.parse(like));

  await insertRecords({
    sql: "insert into likes(user_id, post_id) values ?",
    values: uniqueLikes,
  });
  console.log("insert likes done");

  // insert comments
  const comments = [];
  for (let i = 0; i < NUMBER_OF_COMMENTS; i++) {
    comments.push([
      faker.datatype.number({min: 1, max: NUMBER_OF_USERS}),
      faker.datatype.number({min: 1, max: NUMBER_OF_POSTS}),
    ]);
  }

  const uniqueComments = Array.from(
    new Set(comments.map(comment => JSON.stringify(comment)))
  ).map(comment =>
    JSON.parse(comment)
      .concat(faker.lorem.paragraph())
      .concat(
        faker.date.between(
          "2023-02-01T00:00:00.000Z",
          "2023-03-01T00:00:00.000Z"
        )
      )
  );

  await insertRecords({
    sql: "insert into comments(user_id, post_id, content, commented_at) values ?",
    values: uniqueComments,
  });
  console.log("insert comments done");

  // insert post_tags
  const postTags = [];
  for (let i = 0; i < NUMBER_OF_POST_TAGS; i++) {
    postTags.push([
      faker.datatype.number({min: 1, max: NUMBER_OF_POSTS}),
      faker.datatype.number({min: 1, max: NUMBER_OF_TAGS}),
    ]);
  }

  const uniquePostTags = Array.from(
    new Set(postTags.map(postTag => JSON.stringify(postTag)))
  ).map(postTag => JSON.parse(postTag));

  await insertRecords({
    sql: "insert into post_tags(post_id, tag_id) values ?",
    values: uniquePostTags,
  });
  console.log("insert post_tags done");
};

main();
