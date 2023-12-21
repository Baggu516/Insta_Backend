import mongoose from "mongoose";
const userschema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String
    },
    code:{
        type:String
    }

})
const users=mongoose.model("users",userschema)
export default users