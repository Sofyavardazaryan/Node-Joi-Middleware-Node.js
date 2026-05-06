const fs = require("fs").promises;
const path = require("path");

const readDB = async (req, res, next) => {
  const data = await fs.readFile(
    path.join(__dirname, "..", "db", "users.json"),
    "utf-8",
  );

  const parsed = JSON.parse(data);
  res.locals.users = parsed.users;
  next();
};

module.exports = { readDB };
