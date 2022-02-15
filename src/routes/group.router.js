const groupRouter = require('express').Router()
const GroupController = require('../app/controllers/GroupController')

groupRouter.get('/', GroupController.findAll)
groupRouter.get('/:id', GroupController.findById)
groupRouter.post('/', GroupController.create)
groupRouter.patch('/:id', GroupController.update)

module.exports = groupRouter