const express = require('express');
const { createdRooms, getRooms, addParticepantToRooms, removeParticepantToRooms, getOtherRooms, deleteRoom } = require('../controllers/RoomController');
const Authentication = require('../middlewares/AuthMiddleWare');
const RoomRoute = express.Router();

RoomRoute.route('/createRoom').post(Authentication,createdRooms);
RoomRoute.route('/deleteRoom/:roomId/:userId').get(Authentication,deleteRoom);
RoomRoute.route('/getRooms/:createdBy').get(getRooms);
RoomRoute.route('/getOtherRooms/:currentUser').get(Authentication,getOtherRooms);
RoomRoute.route('/addUserToRoom/:roomId/:participantId/:currentUserId').get(addParticepantToRooms);
RoomRoute.route('/removeUserToRoom/:roomId/:participantId').get(removeParticepantToRooms);

module.exports = RoomRoute;