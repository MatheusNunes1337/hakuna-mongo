const userRouter = require('express').Router()
const UserController = require('../app/controllers/UserController')

userRouter.get('/', UserController.findAll)
userRouter.get('/:id',UserController.findById)
userRouter.post('/', UserController.create)
userRouter.patch('/:id', UserController.update)
userRouter.delete('/:id', UserController.delete)

module.exports = userRouter