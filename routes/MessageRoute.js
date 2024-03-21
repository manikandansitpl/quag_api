const express = require('express');
const { addMessageToRoom, getAllMessageFromRoom } = require('../controllers/MessageController');
const Authentication = require('../middlewares/AuthMiddleWare');
const MessageRoute = express.Router();


MessageRoute.route('/addMessage').post(Authentication, addMessageToRoom);
MessageRoute.route('/getMessage/:roomId').get(Authentication,getAllMessageFromRoom);




module.exports = MessageRoute;