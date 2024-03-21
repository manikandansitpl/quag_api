const mongoose = require('mongoose');

const RoomsScheema = new mongoose.Schema({
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    roomName:String,
    RoomPic:{
        type:String,
        default:"https://w7.pngwing.com/pngs/299/246/png-transparent-computer-icons-online-chat-chat-room-facebook-messenger-symbol-miscellaneous-angle-logo.png"
            },
    participant:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Message'
    }]
},{
    timestamps:true
})

const Room = mongoose.model('Room',RoomsScheema);
module.exports = Room;