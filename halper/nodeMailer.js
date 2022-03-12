const nodemailer =require('nodemailer')

module.exports= async (globalData,emailId)=>{


    try{
        let otp=globalData["otp"];

   var transporter =  nodemailer.createTransport({

       service:"gmail",
       auth:{
           user:"ansariripper@gmail.com",
           pass:"ripperansari12@"
       }

       })    

       var mailOption={
           from:`ansariripper@gmail.com`,
           to:`${emailId}`,
           subject:`Forgot Password`,
           text:`Your OTP is ${otp}`
       }

       const mail=await transporter.sendMail(mailOption)
        

    }catch(e){
        console.log(e);
        return res.status().json({message:e.message, success:true})
    }

}