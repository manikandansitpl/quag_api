const mongoose  = require("mongoose")

exports.dbConfiguration=async()=>{
    try {
        const dbURI = process.env.MONGODB_URI;
        const result = await mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
        return result;
    } catch (error) {
        console.log(error)
    }
}