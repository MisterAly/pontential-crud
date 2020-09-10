const monk = require("monk");

const db = monk(
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI
);

db.catch(function (err) {
  console.log(err);
});

module.exports = db;
