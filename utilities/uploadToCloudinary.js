// need to install multer,cloudinary ,multer-storage-cloudinary
import multer from 'multer';
import {v2 as cloudinary} from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

import dotenv from 'dotenv'
dotenv.config()   
// accessing keys
console.log(process.env.CLOUD_API_SECRETE,process.env.CLOUD_API_KEY,process.env.CLOUD_NAME)  
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key:process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRETE
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'some-folder-name',
    //   format: async (req, file) => 'png', // supports promises as well
    //   public_id: (req, file) => 'computed-filename-using-request',
    },
  });
  const parser = multer({ 
    storage: storage ,
    fileFilter: function (req, file, cb) {
        // Accept images only
        let extArray = file.originalname.split(".");
        let extension = extArray[extArray.length - 1];
        let allowedExt = ["png", "jpg", "jpeg"];
        if (!allowedExt.includes(extension)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      }
});
 export default parser