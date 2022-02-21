const express = require("express");
const userRouter = require('../routes/user.router');
const authRouter = require('./auth.router');
const groupRouter = require('./group.router')
const recoverRouter = require("./recover.router");
const postRouter = require('../routes/post.router')

const authentication = require('../app/middlewares/authenticationMiddleware');

const routes = express.Router({mergeParams: true})

routes.use('/api/v1/authentication', authRouter)
routes.use('/api/v1/users', userRouter)
routes.use('/api/v1/recover', recoverRouter)

routes.use(authentication)
routes.use('/api/v1/groups', groupRouter)
routes.use('/api/v1/groups/:groupId/posts', postRouter)

module.exports = routes