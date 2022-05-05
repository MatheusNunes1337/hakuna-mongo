const chatRouter = require('express').Router();
const ChatController = require('../app/controllers/ChatController');


chatRouter.get('/', ChatController.findByUser);
chatRouter.post('/:targetId', ChatController.create);
chatRouter.get('/:id/messages', ChatController.getMessages);
chatRouter.post('/:id/messages', ChatController.sendMessage);
chatRouter.get('/:id', ChatController.findById);
chatRouter.delete('/:id', ChatController.delete);

module.exports = chatRouter;