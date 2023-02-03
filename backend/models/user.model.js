const mongoose = require ('mongoose');

const userSchema =new mongoose.Schema({
    email:String,
    password:String,
    userIPAddress:String,
})

const Usermodel = mongoose.model("user",userSchema);

module.exports={
    Usermodel
}