const groupRouter = require('express').Router()
const GroupController = require('../app/controllers/GroupController')

const createGroupValidation = require('../app/validations/group/createGroupSchema')
const updateGroupValidation = require('../app/validations/group/updateGroupSchema')

groupRouter.get('/', GroupController.findAll)
groupRouter.get('/:id', GroupController.findById)
groupRouter.post('/', createGroupValidation, GroupController.create)
groupRouter.patch('/:id', updateGroupValidation, GroupController.update)
groupRouter.patch('/:id/join', GroupController.join)
groupRouter.patch('/:id/mods/:userId', GroupController.addModerator)
groupRouter.delete('/:id/mods/:userId', GroupController.removeModerator)
groupRouter.delete('/:id/members/:userId', GroupController.removeMember)
groupRouter.delete('/:id', GroupController.delete)

module.exports = groupRouter