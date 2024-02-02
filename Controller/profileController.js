const usermodel = require('../Models/user');
const bcrypt = require('bcrypt');
// const { use } = require('../Routes/Web.');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dgl0ugw9p', 
  api_key: '233799267255433', 
  api_secret: "JcgJ5SbrsgtWVCuQ2ne9ZRCjmUU"
});

class profileController{

static updatepass = async (req,res)=>{
try{
  const {oldpass : op, newpass : np,cnewpass : cnp } = req.body
  // console.log(op);
  const record = await usermodel.findOne({_id : req.data1._id});
    //console.log(record);
  if(record){
          const ismatched = await bcrypt.compare(op,record.password)
          if(ismatched){
           if(np === cnp){
            const hashpass = await bcrypt.hash(np,10)
              const result = await usermodel.findByIdAndUpdate(record._id,{
                password : hashpass
              })
              res.status(201).json({status:"Success",message:"Password Updated Successfully !"});
           }else{
            res.status(401).json({status:"Failed",message:"New Password and Confirm Password are matched"});
           }
          }else{
            res.status(401).json({status:"Failed",message:"Old Password is Incorrect"});
          }
  }else{
    res.status(401).json({status:"Failed",message:"Record Not Found Please Check Your old password"});
  }
}catch(error){
  console.log(error);
}
}
        static updateprofile = async (req,res)=>{
          try{
              const record = await usermodel.findOne({_id : req.data1._id})
              // console.log(record);   
              // res.status(201).json({status:"success", Current_Name : record.name, Current_Email : record.email, Current_Image : record.image.url }); 
              const {name : nm, email : em} = req.body  
              if(!req.files){
                await usermodel.findByIdAndUpdate(record._id,{
                  name : nm,
                  email : em
                })
                res.status(201).json({status: "success",message: "only Name and Email Updated"})
              }else{
                const img =  req.files.foo
                await cloudinary.uploader.destroy(record.image.public_id)
                const rimg = await cloudinary.uploader.upload(img.tempFilePath,{folder:"apiproject"})
                await usermodel.findByIdAndUpdate(record._id,{
                  name : nm,
                  email : em,
                  image : {
                    public_id : rimg.public_id,
                    url : rimg.secure_url
                  }
                })
                res.status(201).json({status: "success",message: "only Name Email and Image Updated"})
              }
          }catch(error){
            console.log(error);
          }
        }
}
module.exports = profileController;