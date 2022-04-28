const mongoose =require('../database/connection')
const validator =require('validator')

const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        minlength:[3,'minium 3 characters']
    },
    lastName:{
        type:String,
        require:true,
        minlength:[3,'minium 3 characters']
    },
    emailID:{
        type:String,
        require:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email Is Not In Correct Formate")

            }
        }
        },
        phoneNo:{
            type:Number,
            require:true,

        },
        password:{
            type:String,
            require:true,
            minlength:[8,'minium 8 characters Is Required']
        }
    
})

 module.exports=mongoose.model('userModel',userSchema)