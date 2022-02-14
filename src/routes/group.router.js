const groupRouter = require('express').Router()
const GroupController = require('../app/controllers/GroupController')

groupRouter.get('/', GroupController.findAll)

module.exports = groupRouter