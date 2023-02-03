const mongoose=require('mongoose');

const todoSchema= new mongoose.Schema({
    taskname:String,
    status:String,
    tag:String,
})


const Postmodel=mongoose.model("post",todoSchema);

module.exports={
   Todomodel
}