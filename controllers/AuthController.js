const errorhandlers = require("../middlewares/ErrorHandlers");
const bcrypt = require('bcrypt');
const User = require("../scheema/AuthScheema");
const jsonToken = require('jsonwebtoken');

exports.signUp=async(req,res,next)=>{
    const {username , password ,email, description , profilePic } = req.body;
    try {
        if(!username || !password || !email) return errorhandlers(400 , "you Have Missed Some fields!!",res);

        const existingUser = await User.findOne({email});


        if(existingUser) return errorhandlers(400 ,"user already exsist !!",res)

        const newUser = await User({
            username,
            email,
            password,
            description,
            profilePic
        })

        await newUser.save();
        
        const token = jsonToken.sign(newUser.id , "mani22kpcbh")
        res.status(201).json({success:true,newUser,token})
    } catch (error) {
        next(error)
    }
}

exports.login=async(req,res,next)=>{
    const {email , password} = req.body;
    try {
        if(!password || !email) return errorhandlers(400 , "you Have Missed Some fields!!",res);

        const existingUser = await User.findOne({email});
          
        if(!existingUser) return errorhandlers(404 ,"user not found please signup first !!",res);

        const isLogin = await bcrypt.compare(password,existingUser.password);

        const token =  jsonToken.sign(existingUser.id , "mani22kpcbh")

        if(isLogin){
             return res.status(200).json({success:true,message:'login successfully !!',token,newUser:existingUser})
        } else {
            return res.status(400).json({success:false,message:'incorrect password !!'})
        }
    } catch (error) {
        next(error)
    }
}

exports.getUser=async(req,res,next)=>{
    const {currentUserId} = req.params;
    try {
        const users = await User.find({_id:{$ne:currentUserId}})
        res.status(200).json({users})
    } catch (error) {
        next(error)
    }
}