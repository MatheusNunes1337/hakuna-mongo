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
    if (!user) throw new InvalidCredentials('Esse nome de usuário não existe na base de dados');

    if (!await bcrypt.compare(password, user.password))
      throw new InvalidCredentials('A senha está incorreta. Tente novamente');

    const { _id } = user;
    const token = jwt.sign({  _id: _id.toString() }, process.env.API_SECRET, {
      expiresIn: '1d'
    });

    const response = { token, id: _id.toString() };

    return response;
  }
}

module.exports = new AuthService();