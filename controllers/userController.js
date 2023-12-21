import { customResponse } from "../utilities/customResponse.js";
import users from "../modals/users.js";
// encryting password...
import bcrypt from "bcrypt"
// ..........................
// ....for token.......
import { v4 as uuidv4 } from 'uuid'; 
// ...........
export const Register = async (req, res) => {
  console.log(req.body);
  let { name, email, password } = req.body;
  if (!name || !email || !password) {
    return customResponse(res, 400, false, "fill all the fields", null);
  }
  try {
    
     let exist =await users.findOne({email})
     console.log(exist)
     if(exist==null){
        let hashPassword=await bcrypt.hash(password, 10)
        let token = uuidv4()
        let newuser=await users.create({
            name,email,password:hashPassword,token:token
        })
        if(newuser){
            return customResponse(res,200,true,"Registered successfully",newuser)
        }
        return customResponse(res,200,false,"Not Registered",null)

     }
     else{
        return customResponse(res,400,false,"user already exist",null)
     }
  } catch (error) {
    customResponse(res,400,false,"something went wrong",null)
  }
};
// .......Login....................
export const Login=async(req,res)=>{
    let {email, password } = req.body;
    console.log(req.body)
    if (!email || !password) {
      return customResponse(res, 400, false, "fill all the fields", null);
    } 
    let exist = await users.findOne({email})
    if(exist==null){
      return customResponse(res,400,false,"User doesn't exist",null)
    }
    try {
        console.log("above compare")
        let check=await bcrypt.compare(password, exist.password)
        console.log("below compare")
    if(check){
        let token = uuidv4();
        exist.token = token;
        let updatedUser = await exist.save();
        return customResponse(res,200,true,"User Logged in sucessfully",updatedUser)
    }
    else{
        return customResponse(res,400,false,"Invalid credentials",null)
    }
    } catch (error) {
        customResponse(res,500,"something went wrong",null)
    }
}
// .......................send-opt................
export const SendOtp=async(req,res)=>{
      let otp="123"
      let {email}=req.body
      if(!email){
        return customResponse(res, false, "Please provide email", null)
      }
      try {
        let exist=await users.findOne({email})
        if(!exist){
        return customResponse(res, false, "User does not exist", null)
        }
        exist.code=otp
        let updatedUser = await exist.save();
            // send the code to phone number:

        customResponse(res,200, true, "OTP sent successfully", updatedUser)

      } catch (error) {
        customResponse(res,500,"something went wrong",null)
      }
      


}
// ...................verifying otp..............
export const verifyingOtp=async(req,res)=>{
    const {otp, newPassword, email} = req.body
    try {
        if(!otp || !newPassword || !email){
            return customResponse(res, false, "Please fill all the fields", null)
        }
        const foundUser = await users.findOne({email: email})
    
        if(foundUser == null){
            return customResponse(res, false, "User does not exist", null)
        } 
        let savedOtp = foundUser.code;
        if(savedOtp == otp){
            // hash the password:
               const hashedPassword = await bcrypt.hash(newPassword, 10)
               foundUser.password = hashedPassword;
               foundUser.code = null;
               let updatedUser = await foundUser.save();
               return customResponse(res,200, true, "Password updated successfully", updatedUser)
       }
       else{
           return customResponse(res,400, false, "Invalid OTP", null)
       }
    } catch (error) {
        customResponse(res,500,"something went wrong",null) 
    }
}
// ............Logout.....................pending..
export const Logout=async(req,res)=>{
    console.log(req.body,req.user)
     let user=req.user
     console.log("userAdd",user)  //this user comming from Auth
     try {
        let exist=await users.findOne({email:user.email})
        exist.token=null
        let updatedUser = await exist.save();
        return customResponse(res,200, true, "Logout Successfully", updatedUser)
     } catch (error) {
        customResponse(res,500,"something went wrong",null)
     }
   
}

// .................Reset Password.............
export const ResetPassword=async(req,res)=>{
    try {
        let {email,oldPassword,newPassword}=req.body
     if(!email || !oldPassword || !newPassword){
        return customResponse(res,400,false,"Enter all fields",null)
     }
     let exist=await users.findOne({email})
     if(!exist){
        return customResponse(res,400,false,"Invalid Email",null)      
     }
     let check=await bcrypt.compare(oldPassword, exist.password)
     if(!check){
        return customResponse(res,400,false,"Invalid oldPassword",null)   
     }
     let hashPassword=await bcrypt.hash(newPassword, 10)
    exist.password=hashPassword
    let upadatedUser=await exist.save()
    return customResponse(res,200,true,"Reset successfully",upadatedUser)

    } catch (error) {
        customResponse(res,500,"something went wrong",null)
    }
     


}
// three different ways to uplaod image.....
// .........1.)uploading single file........
export const uploadSingleImage=async(req,res)=>{
    console.log( req.file.path)
    res.send( req.file.path)

}
// .........2.)uploading many file........
export const uploadManyImages=async(req,res)=>{
    let linkArr = []  
    for(let i=0;i<req.files.length;i++){
        linkArr.push(req.files[i].path)
    }
    res.json(linkArr);
}
// .........3.)uploading many file singly........
export const uploadManyImagesSingly=async(req,res)=>{
    // req.files["image1"][0].path 
    // req.files["image2"][0].path
    // req.files["image3"][0].path

    res.json({image1: req.files["img1"][0].path, image2: req.files["img2"][0].path, image3: req.files["img3"][0].path});

}