import { chatRoomModel } from "../models/chatroom.js"
import mongoose from "mongoose";

const messageSchema=mongoose.model('chatRoom',chatRoomModel);


export const getAllMessage=async(req,res)=>{
   console.log(req.session)
    const data =await messageSchema.find({}).sort({date: 'desc'}).limit(10).exec( );
    
    res.status(200).render("chatroom.ejs",{data:data});
}

export const addMessage=async(req,res)=>{
    try{
        
    const msg=new messageSchema({message:req.body.message,author:req.body.author});
    await msg.save();
    console.log("Message entered");
    res.status(200).redirect("/chatroom");
    }catch(err){
        console.log("error while saving message",err);
        res.sendStatus(500);
    }
}

