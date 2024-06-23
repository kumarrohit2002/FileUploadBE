const mongoose = require('mongoose')
const nodemailer = require("nodemailer");
require('dotenv').config();

const fileSchema= new mongoose.Schema({
    name:{
        type: 'string',
        required: true
    },
    imageUrl:{
        type: 'string'
    },
    videoUrl:{
        type: 'string'
    },
    tags:{
        type: 'string'
    },
    email:{
        type: 'string'
    }
})


// post middleware  for mail........
fileSchema.post('save', async (doc) => {
    try{
        // console.log("docs: ",doc);

        //transporter

        let transporter =nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        //send mail
        let info = await transporter.sendMail({
            from:`Rohit Ranjan`,
            to:doc.email,
            subject:`New File Uploaded on Cloudinary`,
            html:`<h1>Hello Yaar</h1>
            <p> file is uploaded successfully</p>`
        })

        // console.log("Info: ",info);



    }catch(error){
        console.log(error);
    }
})



const File=mongoose.model('File',fileSchema)
module.exports=File;