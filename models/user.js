import mongoose from "mongoose";
const Schema=mongoose.Schema;
export const userModel=new Schema(
    {
        name:String,
        email:String,
        password:String,
        
    }
)