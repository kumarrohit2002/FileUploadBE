// app ctrete
const express = require('express')
const app = express();

//PORT find
require('dotenv').config();
const PORT=process.env.PORT || 4000

//middleware add karna hai
app.use(express.json());

const fileupload=require('express-fileupload');
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}));

//db se connect karna hai
const db=require('./config/database');
db.connect();

//cloud se connect karna hai
const cloudinary=require('./config/cloudinary');
cloudinary.cloudinaryConnect();

//api route mount karna hai
const upload=require('./routes/FileUpload')
app.use('/api/v1/upload',upload);

//activation server
app.listen(PORT,(req,res)=>{
    console.log(`App is Running at POST no ${PORT}`);
})

app.get('/',(req,res)=>{
    res.send(`<h1>This is Home Page DooD</h1>`);
})



