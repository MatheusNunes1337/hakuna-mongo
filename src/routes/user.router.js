const userRouter = require('express').Router()
const UserController = require('../app/controllers/UserController')
const authentication = require('../app/middlewares/authenticationMiddleware')
const imageUpload = require('../config/multer/imageUpload')

const createUserValidation = require('../app/validations/user/createUserSchema')
const getAllUsersValidation = require('../app/validations/user/getAllSchema')
const updateUserValidation = require('../app/validations/user/updateUserSchema')
const objectIdValidation = require('../app/validations/objectIdSchema')

userRouter.get('/', authentication, getAllUsersValidation, UserController.findAll)
userRouter.get('/:id', objectIdValidation, authentication, UserController.findById)
userRouter.post('/', createUserValidation, UserController.create)
userRouter.patch('/:id', objectIdValidation, authentication, updateUserValidation, imageUpload.single('profilePic'), UserController.update)
userRouter.delete('/:id', authentication, objectIdValidation, UserController.delete)

module.exports = userRouter