const userRouter = require('express').Router()
const UserController = require('../app/controllers/UserController')

userRouter.get('/', UserController.findAll)

module.exports = userRouter