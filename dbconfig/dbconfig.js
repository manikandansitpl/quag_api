const mongoose  = require("mongoose")

exports.dbConfiguration=async()=>{
    try {
        const result = await mongoose.connect('mongodb+srv://admin123:EEKH5syXCX4Ujhtu@cluster0.zjpvb1r.mongodb.net/')
        return result;
    } catch (error) {
        console.log(error)
    }
}