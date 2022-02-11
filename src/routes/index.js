const express = require("express");
const userRouter = require('../routes/user.router');
const authRouter = require('./auth.router');

const routes = express.Router()

routes.use('/api/v1/authentication', authRouter)
routes.use('/api/v1/users', userRouter)

module.exports = routes