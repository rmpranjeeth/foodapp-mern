var express = require('express');
var router = express.Router();
const {mongodb,dbName,dbUrl} = require('../config/dbConfig')
const {mongoose,usersModel,foodModel,orderModel} = require('../config/dbSchema')
const {hashPassword,hashCompare,createToken,decodeToken,validateToken,adminGaurd} = require('../config/auth')
require("dotenv").config();
console.log("hi")

router.get('/',validateToken,adminGaurd,async(req,res)=>{
  res.send({
    statusCode:200,
    message:"Valid Token"
  })
})

router.post('/signup', async(req, res)=> {
    try {
      let users = await usersModel.find({email:req.body.email})
      if(users.length>0)
      {
        res.send({
          statusCode:400,
          message:"User Already Exists"
        })
      }
      else
      {
        let hashedPassword = await hashPassword(req.body.password)
        req.body.password = hashedPassword
        console.log(typeof req.body);
        let body = JSON.parse(req.body);
        let user = await usersModel.create(body)
        res.send({
          statusCode:200,
          message:"SignUp Successful!",
          user
        })
      }

    } catch (error) {
      console.log(error)
      res.send({
        statusCode:500,
        message:"Please fill all fields",
        error
      })
    }
});

router.post('/login',async(req,res)=>{
  try {
    let user = await usersModel.findOne({email:req.body.email})
    if(user)
    {
       let validatePwd = await hashCompare(req.body.password,user.password)
       if(validatePwd){
          let token = await createToken({email:user.email,role:user.role})
          res.send({
            statusCode:200,
            message:"Login Successfull",
            role:user.role,
            token,
            userId:user._id
          })
        }
       else
       {
        res.send({
          statusCode:401,
          message:"Incorrect Password"
        })
       }

    }
    else
    {
      res.send({
        statusCode:400,
        message:"User Does Not Exists"
      })
    }

  } catch (error) {
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal Server Error",
      error
    })
  }
})

module.exports = router;