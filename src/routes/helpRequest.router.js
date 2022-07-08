const helpRequestRouter = require('express').Router();
const HelpRequestController = require('../app/controllers/HelpRequestController');

helpRequestRouter.get('/:id', HelpRequestController.getById);
helpRequestRouter.post('/', HelpRequestController.create);
helpRequestRouter.delete('/:id', HelpRequestController.decline);

module.exports = helpRequestRouter;