import { Router } from "express";
export const router=Router()
import { Register,Login,SendOtp,verifyingOtp,Logout,ResetPassword, uploadSingleImage, uploadManyImages,uploadManyImagesSingly } from "../controllers/userController.js";
import { Auth } from "../middlewares/Auth.js";
import parser from "../utilities/uploadToCloudinary.js";

router.post("/register",Register)
router.post("/login",Login)
router.get("/user",Auth,(req,res)=>{
    res.send("hello")
})
router.post("/send-otp",SendOtp)
router.patch("/verify-otp",verifyingOtp)
router.post("/reset-password",Auth,ResetPassword)
router.post("/logout",Auth,Logout)
// router.get("/logout",Logout)
// .......image_uploading routers..
router.post("/upload-single-imgage",parser.single("img"),uploadSingleImage)//here img is the name key for the image path like {img:location of the img}
router.post("/upload-many-images",parser.array('xyz', 5),uploadManyImages)
router.post("/upload-many-images-singly",parser.fields([
    {name:"img1",maxCount:1},{name:"img2",maxCount:1},{name:"img3",maxCount:1}
]),uploadManyImagesSingly)