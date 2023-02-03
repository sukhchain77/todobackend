const mongoose = require('mongoose');

mongoose.set('strictQuery',true);

const express = require('express');

const app = express();
app.use(express.json());

require("dotenv").config();
const cors=require("cors");
app.use(cors());

const {connection}=require("./config/db");
const {userRouter}=require("./routes/user.route");
const {todoRouter}=require("./routes/todo.route");
const {authenticator}=require("./middlewares/authenticator.middleware");

app.get("/",(req,res)=>{
     res.send("Welcome to the TODO home page");
})


app.use("/users",userRouter);
app.use(authenticator);
app.use("/todo",todoRouter);

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("CONNECTED TO DATABASE");
    } catch (error) {
        console.log("Unable to connect to the Database");
    }

    console.log(`server is running at = http://localhost:${process.env.port}`);
})