const fs = require("fs").promises;
const path = require("path");

class GlobalService {
  async readDb() {
    const data = await fs.readFile(
      path.join(__dirname, "..", "db", "users.json"),
      "utf-8",
    );

    const users = JSON.parse(data);
    return users;
  }
}

module.exports = GlobalService;