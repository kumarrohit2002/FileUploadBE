const express=require('express')
const router=express.Router();

const {loaclFileUpload, imageUpload}=require('../controllers/fileUpload')

//api route
router.post('/localFileUpload',loaclFileUpload);
router.post('/imageUpload',imageUpload);

module.exports=router;
