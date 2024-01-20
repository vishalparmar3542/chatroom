import express  from "express";
import {auth} from "../middleware/auth.js"
import * as message from "../controller/message.js";

export const messageRouter=express.Router();
  messageRouter
        .get('/chatroom',auth,message.getAllMessage)
        .post('/chatroom/send',auth,message.addMessage);