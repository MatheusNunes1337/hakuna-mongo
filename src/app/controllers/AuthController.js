const AuthService = require('../services/AuthService');

class AuthController {
  async login(req, res) {
      const response = await AuthService.login(req.body);
      return res.status(200).json(response);
  }
}

module.exports = new AuthController();