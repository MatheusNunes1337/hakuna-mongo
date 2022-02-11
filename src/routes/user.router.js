const userRouter = require('express').Router()
const UserController = require('../app/controllers/UserController')
const authentication = require('../app/middlewares/authenticationMiddleware')
const createUserValidation = require('../app/validations/user/createUserSchema')
const getAllUsersValidation = require('../app/validations/user/getAllSchema')

userRouter.get('/', authentication, getAllUsersValidation, UserController.findAll)
userRouter.get('/:id', authentication, UserController.findById)
userRouter.post('/', createUserValidation, UserController.create)
userRouter.patch('/:id', authentication, UserController.update)
userRouter.delete('/:id', authentication, UserController.delete)

module.exports = userRouter