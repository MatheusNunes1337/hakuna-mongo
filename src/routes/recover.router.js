const recoverRouter = require('express').Router()
const MailController = require('../app/controllers/MailController')

recoverRouter.post('/', MailController.sendMail)

module.exports = recoverRouter