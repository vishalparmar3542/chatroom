import { chatRoomModel } from "../models/chatroom.js"
import mongoose from "mongoose";

const messageSchema=mongoose.model('chatRoom',chatRoomModel);


export const getAllMessage=async(req,res)=>{
   console.log(req.session)
    const data =await messageSchema.find({}).sort({date: -1}).limit(10).exec( );
   const  author=req.session.user.name;
    res.status(200).render("chatroom.ejs",{data:data,author:author});
}



