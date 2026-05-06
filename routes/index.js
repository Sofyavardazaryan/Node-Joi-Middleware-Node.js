const express = require("express");
const router = express.Router();
const { readDB } = require("../middleware/readDB");
const { checkBody } = require("../middleware/checkBody");
const { checkLogin } = require("../middleware/loginBody");
const bcrypt = require("bcryptjs");
const fs = require("fs").promises;
const path = require("path");

router.get("/", readDB, (req, res) => {
  const { users } = res.locals;
  res.render("index", {
    users,
    user: req.session?.user || null,
  });
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", checkBody, readDB, async (req, res) => {
  try {
    const { validateBody, users } = res.locals;
    const existUser = users.find((u) => u.email === validateBody.email);

    if (existUser) {
      return res.send("Email already exists");
    }

    validateBody.id = Date.now();
    delete validateBody.repeat_password;

    const hashedPassword = await bcrypt.hash(validateBody.password, 10);

    validateBody.password = hashedPassword;
    users.push(validateBody);

    await fs.writeFile(
      path.join(__dirname, "..", "db", "users.json"),
      JSON.stringify({ users }, null, 2),
    );

    res.redirect("/login");
  } catch (error) {
    res.send("Register Error");
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", checkLogin, readDB, async (req, res) => {
  try {
    const { users, validateBody } = res.locals;
    const { email, password } = validateBody;
    const user = users.find((u) => u.email === email);

    if (!user) {
      return res.send("Wrong email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send("Wrong email or password");
    }

    req.session.user = user;

    res.redirect("/");
  } catch (error) {
    res.send("Login Error");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
