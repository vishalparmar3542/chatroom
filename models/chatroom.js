
import mongoose from "mongoose";
const Schema=mongoose.Schema;
export const chatRoomModel=new Schema(
    {
        message:String,
        author:String,
        date:{ type: Date, default: Date.now }
    }
)