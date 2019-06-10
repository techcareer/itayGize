const express = require('express');
const router = express.Router();
const userModel = require('../models/users')


const RegisterValidation = require('../validation/users/RegisterValidation')
const LoginVal = require('../validation/users/LoginValidation')

router.post('/register',(req,res)=>{

    const {error , isVaild} = RegisterValidation(req.body)
    if(!isVaild) return res.status(200).json(error);

    userModel.AddUser(req.body)
    .then((result)=>{
        return res.status(200).json(result);
        
    });
});

router.post('/login',(req,res)=>{
    const {error , isVaild} = LoginVal(req.body)
    if(!isVaild) return res.status(200).json({error : error});
    
   userModel.Login(req.body)
   .then((result)=>{
       console.log(result)
       if(result.isSuceess){
        userModel.setCookie(result.userId,req,res);
       }
       return res.status(200).json(true);
   })
});

router.post('/addLine',(req,res)=>{
  console.log(req.body)
    userModel.AddLineToUser(req.body.id).then((data)=>{
        return res.status(200).json(data);
    })
    
})


router.get('/me',(req,res)=>{
    // console.log(req)
    return res.json(userModel.getCookie())
})



module.exports = router;
