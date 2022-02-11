const authRouter = require('express').Router();
const AuthController = require('../app/controllers/AuthController');
const loginValidation = require('../app/validations/authentication/loginSchema')

authRouter.post('/', loginValidation, AuthController.login);

module.exports = authRouter;