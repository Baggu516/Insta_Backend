import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config() 
const MongoConnection=async()=>{
    try {
        let a=await mongoose.connect(process.env.MONGO_DB_URL)
        // console.log(a)
        console.log("Database connected.....")
    } catch (error) {
        console.log("err")
        
    }
}
MongoConnection()
