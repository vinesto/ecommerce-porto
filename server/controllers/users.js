const User = require('../models/users');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const saltRounds = 10
require('dotenv').config()

const register = function(req,res){
  var salt = bcrypt.genSaltSync(saltRounds)
  var hash = bcrypt.hashSync(req.body.password, salt)
  console.log('===ini req body register==',req.body);
  
  User.findOne({
    email:req.body.email
  })
  .then(function(dataUser){
    console.log('===reqbody===',req.body);
    
    console.log('====datauser===',dataUser);
    if(!dataUser){
      let {name,email}=req.body
      User.create({
        name:name,
        email:email,
        password:hash
      })
      .then(function(data){
        res.status(200).json({message:"new user added", newUser:data })
      })
      .catch(function(){
        res.status(500).json({message:"register failed"})
      })
    }else{
      res.status(400).json({message:"data not found"})
    }
  })
  .catch(function(err){
    res.status(401).json({err})
  })
}

const login = function(req,res){
  User.findOne({
    email:req.body.email
  })
  .then(function(dataUser){
    if(dataUser){
      let token = jwt.sign({name:dataUser.name, email:dataUser.email},process.env.JWT_KEY)
      let decodedPass = bcrypt.compare(req.body.password, dataUser.password)
      if(decodedPass){
        res.status(200).json({token})
      }else{
        res.status(400).json({message:"email/password is wrong"})
      }
    }
  })
  .catch(function(err){
    res.status(500).json({message:'email not found',err:err})
  })
}

module.exports = {register,login}