import express  from "express";

import {logauth} from "../middleware/auth.js"
import * as home from "../controller/home.js";

export const homeRouter=express.Router();
  homeRouter
        .get('/' ,logauth,home.gethome)
        .get('/login',logauth,home.getlogin)
        .get('/signup',logauth,home.getsignup)
        .get('/logout',home.logout)


