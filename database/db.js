import mongoose from "mongoose";
const MongoConnection=async()=>{
    try {
        let a=await mongoose.connect("mongodb+srv://insta:insta@cluster0.acbxqgt.mongodb.net/?retryWrites=true&w=majority")
        // console.log(a)
        console.log("Database connected.....")
    } catch (error) {
        console.log("err")
        
    }
}
MongoConnection()
