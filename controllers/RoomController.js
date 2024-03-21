const errorhandlers = require("../middlewares/ErrorHandlers");
const Room = require("../scheema/RoomScheema")

exports.createdRooms=async(req,res,next)=>{
    const {createdBy,roomName,RoomPic} = req.body;
    try {
        const roomExist = await Room.find({roomName})
       
        if(roomExist.length !== 0) return errorhandlers(400 , "room already exist",res)

        const createRoom = await Room({
            createdBy,
            roomName,
            RoomPic
        })
        await createRoom.save()
        res.status(200).json({success:true,message:'room created successfully !!',room:createRoom})
    } catch (error) {
        next(error)
    }
}

// get own room
exports.deleteRoom = async(req,res,next)=>{
    const {roomId,userId}=req.params;
    try {
        const isMatched = await Room.findOne({_id:roomId}).populate('createdBy','_id')
        if(isMatched?.createdBy?.id === userId){
            const deletedRoom = await Room.findByIdAndDelete(roomId)
        if(deletedRoom){
            res.status(200).json({success:true,deletedRoom,message:"deleted Successfully!!"})
        } else{
            return errorhandlers(404,"no rooms found !!",res)
        }
        } else{
            res.status(400).json({success:false,message:"Owner only Can Delete This Room !!"})
        }
        return
        
    } catch (error) {
        next(error)
    }
}

// get own room
exports.getRooms = async(req,res,next)=>{
    const {createdBy}=req.params;

    try {
        const allRooms = await Room.find({createdBy:createdBy})
        if(allRooms){
            res.status(200).json({success:true,allRooms})
        } else{
            return errorhandlers(404,"no rooms found !!",res)
        }
    } catch (error) {
        next(error)
    }
}

exports.getOtherRooms=async(req,res,next)=>{
    const {currentUser} = req.params;
  try {
    const allRooms =  await Room.find({participant:currentUser}).populate('participant',"_id username email");
    if(allRooms.length ===0) return errorhandlers(404 ,"rooms not found!!",res);
    res.status(200).json({success:true,allRooms})
  } catch (error) {
    next(error)
  }
}

exports.addParticepantToRooms=async(req,res,next)=>{
    const {roomId , participantId, currentUserId} = req.params;

    try {
        const room =  await Room.findOne({_id:roomId}).populate("createdBy","_id")
        if(room.createdBy.id !== currentUserId) return errorhandlers(400 , " You Are Not Allowed to Add or Remove User !!" ,res)

        const isUserExist = room.participant.includes(participantId)
        if (isUserExist) return errorhandlers(400,"user already exist in the room!!",res)
       
        const addUser = await Room.findByIdAndUpdate(roomId , {$addToSet:{participant:participantId}},{new:true})
        res.status(201).json({success:true,message:"***user has been added***",addUser})
    } catch (error) {
        next(error)
    }
}

exports.removeParticepantToRooms=async(req,res,next)=>{
    const {roomId , participantId} = req.params;
        console.log(roomId,participantId);
    try {
        const room =  await Room.findOne({_id:roomId})

        const isUserExist = room.participant.includes(participantId)
       if(isUserExist){
        const addUser = await Room.findByIdAndUpdate(roomId , {$pull:{participant:participantId}},{new:true})
        res.status(201).json({success:true,message:"***user has been removed***",addUser})
       }
    } catch (error) {
        next(error)
    }
}