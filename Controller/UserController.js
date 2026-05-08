class UserController {
  async getUsers(req, res) {
    const { users } = res.locals;
    res.render("index", {
      users: users || [],
    });
  }
}

module.exports = UserController;
