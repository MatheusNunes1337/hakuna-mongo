const groupRouter = require('express').Router()
const GroupController = require('../app/controllers/GroupController')

const createGroupValidation = require('../app/validations/group/createGroupSchema')
const updateGroupValidation = require('../app/validations/group/updateGroupSchema')
const getAllGroupsValidation = require('../app/validations/group/getAllSchema')
const objectIdValidation = require('../app/validations/objectIdSchema')
const modMiddleware = require('../app/middlewares/group/modMiddleware')

groupRouter.get('/', getAllGroupsValidation, GroupController.findAll)
groupRouter.get('/:id', objectIdValidation, GroupController.findById)
groupRouter.post('/', createGroupValidation, GroupController.create)
groupRouter.patch('/:id', objectIdValidation, modMiddleware, updateGroupValidation, GroupController.update)
groupRouter.patch('/:id/join', objectIdValidation, GroupController.join)
groupRouter.patch('/:id/mods/:userId', objectIdValidation, modMiddleware, GroupController.addModerator)
groupRouter.delete('/:id/mods/:userId', objectIdValidation, modMiddleware, GroupController.removeModerator)
groupRouter.delete('/:id/members/:userId', objectIdValidation, modMiddleware, GroupController.removeMember)
groupRouter.delete('/:id', objectIdValidation, modMiddleware, GroupController.delete)

module.exports = groupRouter