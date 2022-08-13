const helpRequestRouter = require('express').Router();
const HelpRequestController = require('../app/controllers/HelpRequestController');

helpRequestRouter.get('/', HelpRequestController.getAllResolved);
helpRequestRouter.get('/:id', HelpRequestController.getById);
helpRequestRouter.post('/', HelpRequestController.create);
helpRequestRouter.patch('/:id', HelpRequestController.cancel);
helpRequestRouter.delete('/:id', HelpRequestController.decline);

module.exports = helpRequestRouter;