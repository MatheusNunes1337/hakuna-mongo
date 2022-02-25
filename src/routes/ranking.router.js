const rankingRouter = require('express').Router()
const UserController = require('../app/controllers/UserController')

rankingRouter.get('/', UserController.getRanking)

module.exports = rankingRouter