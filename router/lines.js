const express = require('express');
const router = express.Router();
const CellPhoneModel = require('../models/cellPhoneLine')



router.post('/addLine',(req,res)=>{
    CellPhoneModel.addLine(req.body)
    .then((result)=>{
        return res.status(200).json(result);
    });
});

router.get('/getLines',(req,res)=>{
    CellPhoneModel.getLine(req.body)
    .then((result)=>{
        return res.status(200).json(result);
    });
});




module.exports = router;
