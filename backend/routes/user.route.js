const express =require('express');

const userRouter=express.Router();

const bcrypt=require('bcrypt');

const jwt=require('jsonwebtoken');

require("dotenv").config();

const {Usermodel}=require("../models/user.model");

userRouter.post("/register", async(req,res)=>{
    const {email,password,userIPAddress}=req.body;
try {
      bcrypt.hash(password,7,async(err,hash)=>{
        if (err) {
            console.log(err.message);
            res.send("Registration Failed!!");
        }
        else{
            const data=new Usermodel({email,gender,userIPAddress,"password":hagh});
            await data.save();
            res.send("Registration Successfull!!");
        }
      })
} catch (error) {
      console.log(err.message);
      res.send("Registration Failed!!");
}

});

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;

    const user=await Usermodel.findOne(email);
    try {
           if(user)
           {
            bcrypt.compare(password,user.password,async(err,result)=>{
                if(result==true)
                {
                    const token=jwt.sign({userId:user._id},process.env.key);
                    res.send({"message":"Log in Successfull","token":token})
                }
                else{
                    res.send("Wrong Credentials!!");
                }
            })
           }
    } catch (error) {
           console.log(err.message);
           res.send("Wrong Credentials!!");

    }
})

module.exports={
    userRouter,
}