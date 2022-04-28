const tokenGenerate = require('../middleware/tokenGenerate');
const userModel=require('../models/user.Schema')
const tokenGenerator =require('../middleware/tokenGenerate')
const mailService =require('../halper/nodeMailer')

var globalData={ };

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

    
    update = async (req,res)=>{

        try{

            const {emailID ,newPassword}=req.body;
            if(!emailID || !newPassword){

                return res.status(400).json({message:"fill the field", success:true})

            }

            const userUpdate=await userModel.findOne({emailID:emailID})

            if(!userUpdate){


                return res.status(404).json({message:"not email found", success:true})
            }
            else if(userUpdate.password===newPassword){

                  return res.status(400).json({message:"you enter the old password", success:true})
            }
            else{
                const id=userUpdate._id;

                const newUpdate=await userModel.findByIdAndUpdate({_id:id},{password:newPassword},{new:true})
                            return res.status(200).json({message:"user update", success:true})
            }

        }catch(e){
            console.log(e);
            return res.status(500).json({message:e.message, success:true})
        }


    }

    forget =async (req,res)=>{
        try{
            const {emailID}=req.body;
            console.log(req.body);

            if(!emailID){
                return res.status(404).json({message:"fill the field", success:false})
            }
            const userForgot=await userModel.findOne({emailID:emailID});
            
            if(!userForgot){
                return res.status(404).json({message:"invalid  EmailID ", success:false})
            }
            else{
              globalData['otp']=Math.floor(Math.random()*999999);
                console.log(globalData);

                mailService(globalData,emailID)

                return res.status(200).json({message:"email send seccessfully", success:true})

            }

        }catch(e){
            console.log(e);
            return res.status(500).json({message:e.message, success:false})
        }
    }
    
    reset =async (req,res)=>{
        try{

           let oldOtp=JSON.stringify(globalData.otp)
 
            const {emailID,otp,newPassword}=req.body
            console.log(req.body);

            if(!emailID || !otp || !newPassword){
                return res.status(400).json({message:"fill the field", success:false})
            }

            const resetEmail=await userModel.findOne({emailID:emailID})

            if(!resetEmail){
                return res.status().json({message:"invalid  EmailID ", success:false})
            }

            else if(emailID===resetEmail.emailID && otp===oldOtp){

               const id = resetEmail._id;
                const userUpdate =await userModel.findByIdAndUpdate({_id:id},{password:newPassword},{new:true})

                return res.status(200).json({message:"password reset successfully", success:true})
            }
            else{

                return res.status(404).json({message:"invalid credentials", success:false})
            }
              
        }catch(e){
            console.log(e);
            return res.status(500).json({message:e.message, success:false})
        }
    }

}

module.exports=new Usercontroller();