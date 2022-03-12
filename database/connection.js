const mongoose =require("mongoose")
mongoose.connect("mongodb://localhost:27017/ForgotResetUser")
.then(()=>{
    console.log("connect")
})
.catch((e)=>{
    console.log(e);
})

module.exports=mongoose;