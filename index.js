const express = require('express');
const http = require('http');
const cors = require('cors');
const env = require('dotenv').config();
// const {Server} = require('socket.io');
const AuthRoute = require('./routes/AuthRoute');
const { dbConfiguration } = require('./dbconfig/dbconfig');
const RoomRoute = require('./routes/RoomRoute');
const MessageRoute = require('./routes/MessageRoute');


const app = express();
const server = http.createServer(app);



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/v1',AuthRoute);
app.use('/api/room',RoomRoute);
app.use('/api/message',MessageRoute)

// const io = new Server(server,{
//     cors:{
//         origin:"*",
//         methods:['GET','POST']
//     }
// })
const PORT = process.env.PORT || 3000;

dbConfiguration().then(()=>{
    console.log("db connected")
}).catch(()=>console.log("error to connect db"))


server.listen(PORT,()=>{
    console.log(`${PORT} is running`)
})


// io.on("connection",(socket)=>{
//     console.log(socket.id);

//     socket.bradcast.to().emit

//     socket.on("disconnect",()=>{
//         console.log("user got disconnected")
//     })
// })
