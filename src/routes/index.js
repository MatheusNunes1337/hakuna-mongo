const express = require("express");
const userRouter = require('../routes/user.router')

const routes = express.Router()
routes.use('/api/v1/users', userRouter)

module.exports = routes