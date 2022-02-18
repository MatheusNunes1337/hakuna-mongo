const recoverRouter = require('express').Router()
const MailController = require('../app/controllers/MailController')
const RecoverController = require('../app/controllers/RecoverController')

recoverRouter.post('/', MailController.sendMail)
recoverRouter.patch('/:email', RecoverController.recoverPassword)

module.exports = recoverRouter