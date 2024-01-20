import { userModel } from "../models/user.js"
import mongoose from "mongoose";

import bcrypt from "bcrypt";
const saltRounds=10;

const userSchema=mongoose.model('users',userModel);

export const signup=async(req,res)=>{
    const name=req.body.name;
    const emailid = req.body.email;
    const password = req.body.password;
    try{
        const data=await userSchema.find({ email:emailid}).exec();
        console.log("signup:");
        console.log(data);
        if(data[0]){
            
            res.render("register.ejs",{msg:"email already used"});
            
        }else{
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
              console.error("Error hashing password:", err);
            } else {
              
             const user= await userSchema.collection.insertOne({ name: name,
            email:emailid,
            password:hash
            });

              if(user)
              {
                console.log(user);
               
                req.session.authorized=true;
                req.session.user={
                    id:user.insertedId,
                    name:name,

              }
                res.redirect('/chatroom');
              }else{
                res.status(500).render("register.ejs",{msg:"server error"});
              }
              
            }
          });
        }

    }catch(err)
    {
        res.status(500).render("register.ejs",{msg:"server error"});
        console.log(err);
          
    }
   
}


export const login=async(req,res)=>{
   
    const email = req.body.username;
    const password = req.body.password;
   
    try{
        const data=await userSchema.find({ email:email}).exec();
      
        if(data){
           const storedHashedPassword=data[0].password;
         
           bcrypt.compare(password, storedHashedPassword, (err, valid) => {
            if (err) {
              console.log("Error comparing passwords: ",err)
              
            } else {
              if (valid) {
                //passed password check
                req.session.authorized=true;
                
                req.session.user={
                      id:data[0].id,
                      name:data[0].name,

                }
                
               
                res.status(100).redirect("/chatroom");
              } else {
                //Did not pass password check
                res.status(401).render("login.ejs",{message:"Wrong pass"})
              }
            }
          });

        }else{
           
            res.status(300).render("login.ejs",{message:"wrong email try signup"});
        }

    }catch(err)
    {
        res.status(500).render("login.ejs",{message:"wrong email try signup"});
        console.log(err);
          
    }
   
}