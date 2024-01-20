import express  from "express";
import * as user from "../controller/user.js";

export const userRouter=express.Router();
  userRouter
        .post('/login',user.login)
        .post('/signup',user.signup);