import bodyParser from "body-parser";
import express  from "express";

import bcrypt from "bcrypt";
import session from "express-session";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';
import {messageRouter} from "./routes/message.js"
import {userRouter} from "./routes/user.js"
import {homeRouter} from "./routes/home.js"
import {savemessage} from "./models/chatroom.js"

import 'dotenv/config'

import { createServer } from "http";
import { Server } from "socket.io";




const server = express();

server.set('trust proxy', 1) // trust first proxy
const sessionMiddleware=session({  
  name: `daffyduck`,
  secret: 'some-secret-example',  
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // This will only work if you have https enabled!
    maxAge: 60000*3 // 10 min
  } 
})
server.use(sessionMiddleware);

server.set("view engine", "ejs");
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static("public"));

const port = 3000;
const saltRounds = 10;

const app = createServer(server);
const io = new Server(app);

io.engine.use(sessionMiddleware);

io.on("connection", (socket) => {
  const session = socket.request.session;
   console.log("socket started with ")
   console.log(session);
   if(session.authorized)
   {
   console.log(session.user.name);
   socket.on("message",async(msg)=>{
    console.log(msg);
    console.log(session.user.name);
    socket.broadcast.emit("serverMessage",[msg,session.user.name]);
    await savemessage(msg,session.user.name)
   
   })
  }else{
    console.log("not able to auth session in socket");
  }
});



mongoose.connect(`mongodb+srv://${process.env.DBURL}`)
  .then(() => console.log('Connected!'))
  .catch((err)=>console.log("not able to connect to db",err))
server.use('/',homeRouter)
server.use('/',messageRouter)
server.use('/',userRouter)
app.listen(port,()=>{
    console.log("server started at: ",port)
})
