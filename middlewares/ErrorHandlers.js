const errorhandlers =(statusC,message,res)=>{
   const statusCode = statusC || 500;
    res.status(statusCode).json({message})
}

module.exports = errorhandlers;