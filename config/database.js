const mongoose = require('mongoose')

require('dotenv').config();
exports.connect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{

    }).then(console.log("DB Connection established"))
    .catch((error)=>{
        console.log("DB connection Issue");
        console.log(error);
        process.exit(1);
    });
}