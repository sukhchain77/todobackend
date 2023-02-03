const express=require('express');
const todoRouter=express.Router();
const {Todomodel}=require("../routes/todo.route");

todoRouter.get("/",async(req,res)=>{
    let queryObj={};
    const{device,device1,device2}=req.query;
    if(device)
    {
        queryObj["device"]=device;
    }
    else if(device1 && device2)
    {
         queryObj={$and:[{device1},{device2}]};
    }

    try {
           const data =await Todomodel.find(queryObj);
           res.send(data);
    } catch (error) {
        console.log(error.message);
        res.send("Unable to get the Todo data");
    }
})

todoRouter.post("/todo",async(req,res)=>{
    const data=req.body;

    try {
        const postData=new Todomodel(data);
        await postData.save();
        res.send("New Todo Data is added to the Database");
    } catch (error) {
        console.log(error.message);
        res.send("Unable to add new Todo data to the Database");
    }
})

todoRouter.patch("update/todo/:id",async(req,res)=>{
    const id=req.params.id;
    const newData=req.body;
    try {
        let postData=await Todomodel.findOne({"_id":id});
        if(postData)
        {
            const todo_user_id=postData.userId;
            const req_user_id=req.body.userId;

            if(todo_user_id==req_user_id)
            {
                await Todomodel.findByIdAndUpdate({"_id":id},newData);
                res.send(`todo data with id=${id} is updated`);
            }
            else{
                res.send({"Message":"You are not authorized to update this data"});
            }
        }
        else{
            res.send(`There is no todo data with id=${id}`);
        }
    } catch (error) {
        console.log(error.message);
        res.send({"Message":"You are not authorized"});
    }
})

todoRouter.delete("delete/todo/:id",async(req,res)=>{
    const id=req.params.id;
    try {
        let postData=await Todomodel.findOne({"_id":id});
        if(postData)
        {
            const todo_user_id=postData.userId;
            const req_user_id=req.body.userId;

            if(todo_user_id==req_user_id)
            {
                await Todomodel.findByIdAndDelete({"_id":id},newData);
                res.send(`todo data with id=${id} is deleted`);
            }
            else{
                res.send({"Message":"You are not authorized to delete this todo data"});
            }
        }
        else{
            res.send(`There is no todo data with id=${id}`);
        }
        
    } catch (error) {
        console.log(error.message);
        res.send({"Message":"You are not authorized to delete this data"});
    }
})

module.exports={
    todoRouter,
}
