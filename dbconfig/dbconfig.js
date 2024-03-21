const mongoose  = require("mongoose")

exports.dbConfiguration=async()=>{
    try {
        const result = await mongoose.connect(process.env.MONGO_URI)
        return result;
    } catch (error) {
        console.log(error)
    }
}