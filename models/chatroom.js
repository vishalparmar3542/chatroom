
import mongoose from "mongoose";
const Schema=mongoose.Schema;
export const chatRoomModel=new Schema(
    {
        message:String,
        author:String,
        date:{ type: Date, default: Date.now }
    }
)

const messageSchema=mongoose.model('chatRoom',chatRoomModel);

export const savemessage=async(msg,name)=>{
    const newmsg=new messageSchema({message:msg,author:name});
    await newmsg.save();
    console.log("message saved");

}