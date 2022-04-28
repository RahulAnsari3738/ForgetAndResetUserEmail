
const secretKey=require('../config/secretKey.json')
const jwt =require('jsonwebtoken')
module.exports=(info)=>{

    const token = jwt.sign({info},secretKey.unique)
    console.log(token);
   
    return token;

}