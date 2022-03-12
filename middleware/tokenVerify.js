const jwt =require('jsonwebtoken')

const secretKey=require('../config/secretKey.json')

module.exports=async(req,res,next)=>{

    try{

     const bear =req.headers.authorization.split(" ")[1]
 
     const decoded = await jwt.verify(bear,secretKey.unique)

     if(!decoded){
         return res.status(404).json({message:"Your are not Authorize User", success:true})
     }

     next()
 
    }catch(e){
        console.log(e);
        return res.status(500).json({message:"not found token", success:true})
    }
}