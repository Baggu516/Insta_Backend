import express from "express"
const app=express()
// ...database connection....
import "./database/db.js"
// ............................
import { router } from "./routers/userRouter.js"
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("hello")
})
app.use("/home",router)

app.listen(5000,()=>{
    console.log("Server is running....")
})