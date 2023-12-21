import users from "../modals/users.js"
import { customResponse } from "../utilities/customResponse.js"

export const Auth=async(req,res,next)=>{

  // console.log("auth",req.body)
  let {token}=req.headers
  // console.log("token",token)
  if(!token){
    return customResponse(res,400,false,"Token is empty",null)
  }
  try {
    let exist=await users.findOne({token:token})
    // console.log("hey........................",exist)
    if(exist == null){
        return customResponse(res,400, false, "Invalid token", null)
    }
   
    req.user=exist;
    next()

  } catch (error) {
    customResponse(res,500,false,"Something went wrong",null)
  }



}