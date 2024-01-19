import express  from "express";
import * as message from "../controller/message.js";

export const messageRouter=express.Router();
  messageRouter
        .get('/chatroom',message.getAllMessage)
        .post('/chatroom/send',message.addMessage);