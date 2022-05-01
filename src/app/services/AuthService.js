const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const UserRepository = require('../repositories/UserRepository');
const InvalidCredentials = require('../errors/InvalidCredentials');

dotenv.config();

class AuthService {
  async login(credentials) {
    const { password } = credentials;
    const user = await UserRepository.getByUsername(credentials.username);

    if (!user) throw new InvalidCredentials('This username does not exist in database');

    if (!await bcrypt.compare(password, user.password))
      throw new InvalidCredentials('The password is incorrect. Try again');

    const { _id } = user;
    const token = jwt.sign({  _id: _id.toString() }, process.env.API_SECRET, {
      expiresIn: '1d'
    });

    const response = { token, id: _id.toString() };

    return response;
  }
}

module.exports = new AuthService();