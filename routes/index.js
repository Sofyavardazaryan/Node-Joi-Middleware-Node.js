const express = require("express");
const router = express.Router();
const { readDB } = require("../middleware/readDB");
const { checkBody } = require("../middleware/checkBody");
const fs = require("fs").promises;
const path = require("path");

router.get("/", readDB, (req, res) => {
  const { users } = res.locals;

  res.render("index", { users });
});

router.post("/register", checkBody, readDB, async (req, res) => {
  const { validateBody, users } = res.locals;
  validateBody.id = Date.now();
  delete validateBody.repeat_password;
  users.push(validateBody);

  await fs.writeFile(
    path.join(__dirname, "..", "db", "users.json"),
    JSON.stringify(users),
  );

  res.redirect("/");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", checkLogin, readDB, (req, res) => {
  const { users, validateBody } = res.locals;
  const { email, password } = validateBody;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.send("Invalid email or password");
  }

  req.session.user = user;

  res.redirect("/");
});

module.exports = router;
