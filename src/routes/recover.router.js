const recoverRouter = require('express').Router()
const MailController = require('../app/controllers/MailController')
const RecoverController = require('../app/controllers/RecoverController')

const emailValidation = require('../app/validations/recover/EmailSchemaValidator')
const passwordValidation = require('../app/validations/recover/PasswordSchemaValidator')

recoverRouter.post('/', emailValidation, MailController.sendMail)
recoverRouter.patch('/:email', passwordValidation, RecoverController.recoverPassword)

module.exports = recoverRouter