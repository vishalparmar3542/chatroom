import bodyParser from "body-parser";
import express  from "express";

import bcrypt from "bcrypt";
import session from "express-session";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';
import {messageRouter} from "./routes/message.js"
import 'dotenv/config'

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



mongoose.connect(`mongodb+srv://${process.env.DBURL}`)
  .then(() => console.log('Connected!'));


 app.use('/',messageRouter)
app.listen(port,()=>{
    console.log("server started at: ",port)
})
