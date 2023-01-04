const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
require("dotenv").config();
const saltRounds = 10;

let hashPassword = async(password)=>{
    console.log(process.env.saltRounds);
    let salt = await bcrypt.genSalt(saltRounds);
    let hashedPassword = await bcrypt.hash(password,salt)
    return hashedPassword
}

let hashCompare = async(password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword)
}

let createToken = async({email,role})=>{
    console.log(process.env.secretKey);
    let token = await jwt.sign(
        {email,role},
        process.env.secretKey,
        {expiresIn:'1h'}
        )
    return token;
}

let decodeToken = async(token)=>{
    let data = jwt.decode(token)
    return data
}


//middleware - verify the token 
let validateToken = async(req,res,next)=>{
    if(req.headers && req.headers.authorization)
    {
        let token = req.headers.authorization.split(" ")[1]
        let data =  await decodeToken(token)
        let date = Math.round(new Date()/1000)
        if(date<=data.exp)
        {
            next()
        }
        else{
            res.send({
                statusCode:400,
                message:"Token Expired"
            })
        }
    }
    else
    {
        res.send({
            statusCode:400,
            message:"No token Found"
        })
    }
}

//middleware - verify the role Admin
let adminGaurd = async(req,res,next)=>{
    if(req.headers && req.headers.authorization)
    {
        let token = req.headers.authorization.split(" ")[1]
    let data =  await decodeToken(token)
    if(data.role==="admin")
        next()
    else
        res.send({
            statusCode:401,
            message:"Unauthorised! Only Admin can access"
        })
    }
    else
    {
        res.send({
            statusCode:400,
            message:"No token Found"
        })
    }
}
module.exports={hashPassword,hashCompare,createToken,decodeToken,validateToken,adminGaurd}