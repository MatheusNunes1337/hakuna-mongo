const mongoose = require('mongoose');
require('dotenv').config();

class DatabaseConnection {
  async connect() {
    return mongoose.connect(process.env.MONGO_URL);
  }
}

module.exports = new DatabaseConnection().connect();