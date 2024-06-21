const File=require('../model/File')

exports.loaclFileUpload=async (req,res)=>{
    try{
        //featch file
        const file=req.files.file;
        console.log("File :", file);

        // let path=__dirname+'/files/'+Date.now()+'.' +`${file.name.split('.')[1]}`;
        let path=__dirname+'/files/' +`${file.name}`;
        console.log("path : ",path);

        file.mv(path,(err)=>{
            console.log(err);
        })

        res.status(200).json({
            success:true, 
            message:"Local file uploaded successfully"
        })

    }catch(error){
        console.log("Error in local file upload handler");
        console.log(error);

    }
}