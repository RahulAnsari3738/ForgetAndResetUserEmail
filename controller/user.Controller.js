const userModel=require('../models/user.Schema')


class Usercontroller{

    register=async (req,res)=>{
        try{

            const {firstName,lastName,emailID,phoneNo,password}=req.body;

            if(!firstName || !lastName || !emailID || !phoneNo || !password){

                return res.status(400).json({message:"fill the field", success:false})
            }

            const userFind=await userModel.findOne({emailID:emailID})
            if(userFind){
                return res.status(400).json({message:"user allready exist", success:false})
            }

            else{

                const userInfo=new userModel({firstName,lastName,emailID,phoneNo,password})
                   
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

            const{emailID,password}=req.body


        }catch(e){
            console.log(e);
            return res.status(500).json({message:e.message, success:false})
        }
    }


}

module.exports=new Usercontroller();