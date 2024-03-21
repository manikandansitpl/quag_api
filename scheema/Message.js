const mongoose = require('mongoose');

const MessageScheema = new mongoose.Schema({

    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    text:String,
    MessageType:String
},{
    timestamps:true
});

const Message =   mongoose.model('Message',MessageScheema);
module.exports = Message;