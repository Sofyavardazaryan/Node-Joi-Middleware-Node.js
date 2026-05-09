const express = require("express");
const router = express.Router();
const { readDB } = require("../middleware/readDB");
const { checkBody } = require("../middleware/checkBody");
const { checkLogin } = require("../middleware/loginBody");
const bcrypt = require("bcryptjs");
const fs = require("fs").promises;
const path = require("path");
const UserController = require("../Controller/UserController")

const userController = new UserController()


router.get("/", userController.getUsers);

router.get("/register", (req, res) => {
  res.redirect("/");
});

router.post("/register", checkBody, readDB, async (req, res) => {
  const { validateBody, users } = res.locals;
  const existUser = users.find(u => u.email === validateBody.email);
  if (existUser) {
    return res.send("Email already exists");
  }
  validateBody.id = Date.now();
  delete validateBody.repeat_password;
  validateBody.password = await bcrypt.hash(validateBody.password, 10);
  users.push(validateBody);
  await fs.writeFile(
    path.join(__dirname, "..", "db", "users.json"),
    JSON.stringify({ users }, null, 2)
  );
  res.redirect("/");
});

router.get("/login", (req, res) => {
  res.redirect("/");
});

router.post("/login", checkLogin, readDB, async (req, res) => {
  const { users, validateBody } = res.locals;
  const user = users.find(u => u.email === validateBody.email);
  if (!user) {
    return res.send("Wrong email or password");
  }

  const isValid = await bcrypt.compare(
    validateBody.password,
    user.password
  );

  if (!isValid) {
    return res.send("Wrong email or password");
  }
  res.redirect("/");
});

router.get("/logout", (req, res) => {
  res.redirect("/");
});

module.exports = router;