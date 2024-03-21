const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const AuthScheema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:'Welcome To Quagmire Chat !!'
    },
    profilePic:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/219/219969.png"
    }
})

AuthScheema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password , 10)
    }
    next();
})
const User = mongoose.model('User',AuthScheema);
module.exports = User;