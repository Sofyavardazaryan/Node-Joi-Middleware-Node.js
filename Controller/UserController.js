class UserController {
  async getUsers(req, res) {
    const users = await req.app.locals.services.users.getUsers()
    
    res.render("index", {
      users: users || [],
    });
  }
}

module.exports = UserController;
