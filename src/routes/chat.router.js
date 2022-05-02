const chatRouter = require('express').Router();
const ChatController = require('../app/controllers/ChatController');


chatRouter.get('/', ChatController.findByUser);
chatRouter.get('/:id', ChatController.findById);
chatRouter.delete('/:id', ChatController.findById);

module.exports = chatRouter;