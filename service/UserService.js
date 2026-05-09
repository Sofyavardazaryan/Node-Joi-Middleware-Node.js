const fs = require("fs").promises;
const path = require("path");
const GlobalService = require("./GlobalService");
GlobalService;

class UserService extends GlobalService {
  async getUsers() {
    const users = await this.readDB();
    return users.users;
  }
}

module.exports = UserService;
