const MailService = require('../services/MailService');

class MailController {
  async sendMail(req, res, next) {
    const response = await MailService.send(req.body)
    return res.status(201).json(response);
  }
}

module.exports = new MailController();