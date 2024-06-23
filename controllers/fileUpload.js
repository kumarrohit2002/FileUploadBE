const File=require('../model/File')
const cloudinary=require('cloudinary').v2;

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

function isFileTypeSupported(fileType,supportedTypes){
    return supportedTypes.includes(fileType);
}

async function uploadFileToCloudinary(file,folder,quality=70){
    const options ={folder,quality};
    
    options.resource_type="auto"
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

exports.imageUpload=async (req,res)=>{
    try{

        //data fetch
        const {name,email,tags}=req.body;
        console.log(name,email,tags);

        const file=req.files.imageFile;
        console.log("file: ",file);

        //Validation
        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file formate not supported"
            })
        }

        //file forat supported 
        const response=await uploadFileToCloudinary(file,"fileUploadFolder",50);
        console.log("ImgUrl: ",response.secure_url);

        //entry save in DB
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })

        res.status(200).json({
            success:true,
            ImgUrl:response.secure_url,
            message:"file uploaded successfully"
        })



    }catch(error){
        console.log("Error in imageUpload hendler");
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in imageUpload hendler"
        })
    }
}

exports.videoUpload=async (req,res)=>{
    try{

        //data fetch
        const {name,email,tags}=req.body;
        console.log(name,email,tags);

        const file=req.files.videoFile;
        // console.log(file);

        //Validation
        const supportedTypes=["mp4","mov"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("FileType: ",fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file formate not supported"
            })
        }

        //file format supported  and compress using:quality 40
        const response=await uploadFileToCloudinary(file,"fileUploadFolder",40);
        console.log("VideoUrl: ",response.secure_url);

        // entry save in DB
        const fileData=await File.create({
            name,
            tags,
            email,
            videoUrl:response.secure_url
        })

        res.status(200).json({
            success:true,
            ImgUrl:response.secure_url,
            message:"video file uploaded successfully"
        })



    }catch(error){
        console.log("Error in Video Upload hendler");
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in Video Upload hendler"
        })
    }
}