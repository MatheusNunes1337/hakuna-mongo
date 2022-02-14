const express = require("express");
const userRouter = require('../routes/user.router');
const authRouter = require('./auth.router');
const groupRouter = require('./group.router')

const authentication = require('../app/middlewares/authenticationMiddleware')

const routes = express.Router()

routes.use('/api/v1/authentication', authRouter)
routes.use('/api/v1/users', userRouter)

routes.use(authentication)
routes.use('/api/v1/groups', groupRouter)

module.exports = routes