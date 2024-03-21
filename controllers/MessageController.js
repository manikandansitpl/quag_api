const errorhandlers = require("../middlewares/ErrorHandlers");
const Message = require("../scheema/Message");
const Room = require("../scheema/RoomScheema");

exports.addMessageToRoom=async(req,res,next)=>{
    const {roomId , senderId , message ,messageType} = req.body;
  try {
    if(!message && !messageType) return errorhandlers(400 ,"bad request !!",res);
    const existRoom = await Room.findOne({_id:roomId}).populate("createdBy","_id");
    const ispresent = existRoom.participant.includes(senderId);
    const isOwner = existRoom.createdBy.id === senderId;
    if(ispresent || isOwner){
        const msg = await Message({
            sender:senderId,
            text:message,
            MessageType:messageType
        })
        const createdMsg =  await msg.save();
        const MsgAdded =  await Room.findByIdAndUpdate(roomId,{$push:{messages:createdMsg._id}},{new:true})
        res.status(201).json({success:true,MsgAdded})
    }
  } catch (error) {
    next(error)
  }
}

exports.getAllMessageFromRoom=async(req,res,next)=>{
    const {roomId} = req.params;
  try {
    const existRoom = await Room.findOne({_id:roomId}).populate({path:"messages",
populate:{
    path:"sender",
    select:"username email description profilePic"
}
})
   res.status(200).json({roomMessage:existRoom})
  } catch (error) {
    next(error)
  }
}