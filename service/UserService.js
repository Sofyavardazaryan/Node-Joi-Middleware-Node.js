const fs = require ('fs').promises
const path = require ('path');

class UserService {
  async getUsers() {
   
      const data = await fs.readFile(
        path.join(__dirname, "..", "db", "users.json"),
        "utf-8",
      );

      const users = JSON.parse(data);
      return users
    
   
  }
}

module.exports = UserService;
