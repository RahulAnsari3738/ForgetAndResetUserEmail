const tokenGenerate = require('../middleware/tokenGenerate');
const userModel=require('../models/user.Schema')
const tokenGenerator =require('../middleware/tokenGenerate')


class Usercontroller{

    register=async (req,res)=>{
        try{

            const {firstName,lastName,emailID,password}=req.body;

            if(!firstName || !lastName || !emailID  || !password){

                return res.status(400).json({message:"fill the field", success:false})
            }

            const userFind=await userModel.findOne({emailID:emailID})
            if(userFind){
                return res.status(400).json({message:"user allready exist", success:false})
            }

            else{

                const userInfo=new userModel({firstName,lastName,emailID,password})
                   
                    const result =await userInfo.save()
                   return res.status(200).json({message:"user register successfully", success:true ,result})
            }

        }catch(e){
            console.log(e);
            return res.status(500).json({message:e.message, success:false})
        }
    }


    login=async (req,res)=>{
        try{

            const{emailID,password}=req.body;

            if(!emailID || !password){
                return res.status(400).json({message:"fill the field", success:false})
            }

            const userEmail=await userModel.findOne({emailID:emailID})

            if(!userEmail)
           
            {
                return res.status(404).json({message:"emailID not register", success:false})
            }
            else if(userEmail.password!=password){
                return res.status(404).json({message:"invalid password", success:false})
            }
            else{

               const token = tokenGenerator(userEmail);
                
                return res.status(200).json({message:"user login successfully", success:true,token})
            }

        }catch(e){
            console.log(e);
            return res.status(500).json({message:e.message, success:false})
        }
    }


}

module.exports=new Usercontroller();