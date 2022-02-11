const userRouter = require('express').Router()
const UserController = require('../app/controllers/UserController')
const authentication = require('../app/middlewares/authenticationMiddleware')

userRouter.get('/', authentication, UserController.findAll)
userRouter.get('/:id', authentication, UserController.findById)
userRouter.post('/', UserController.create)
userRouter.patch('/:id', authentication, UserController.update)
userRouter.delete('/:id', authentication, UserController.delete)

module.exports = userRouter