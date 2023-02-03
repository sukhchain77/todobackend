const jwt=require("jsonwebtoken");
require("dotenv").config();

const authenticator=(req,res,next)=>{
    let token = res.headers.authorization;

    if(token){
        const decoded = jwt.verify(token,process.env.key);

        if(decoded)
        {
            let userId=decoded.userId;
            req.body.userId=userId;
            next();
        }else{
            res.send("Please Log in First!!");
        }
    }
    else{
        res.send("Please Log in First!!");
    }
}

module.exports={
    authenticator
}