const groupRouter = require('express').Router()
const GroupController = require('../app/controllers/GroupController')

const createGroupValidation = require('../app/validations/group/createGroupSchema')
const updateGroupValidation = require('../app/validations/group/updateGroupSchema')
const getAllGroupsValidation = require('../app/validations/group/getAllSchema')
const objectIdValidation = require('../app/validations/objectIdSchema')

groupRouter.get('/', getAllGroupsValidation, GroupController.findAll)
groupRouter.get('/:id', objectIdValidation, GroupController.findById)
groupRouter.post('/', createGroupValidation, GroupController.create)
groupRouter.patch('/:id', objectIdValidation, updateGroupValidation, GroupController.update)
groupRouter.patch('/:id/join', objectIdValidation, GroupController.join)
groupRouter.patch('/:id/mods/:userId', objectIdValidation, GroupController.addModerator)
groupRouter.delete('/:id/mods/:userId', objectIdValidation, GroupController.removeModerator)
groupRouter.delete('/:id/members/:userId', objectIdValidation, GroupController.removeMember)
groupRouter.delete('/:id', objectIdValidation, GroupController.delete)

module.exports = groupRouter