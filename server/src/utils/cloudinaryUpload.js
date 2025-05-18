
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



const uploadToCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });
        // file has been uploaded successfully
        fs.unlinkSync(localFilePath)
        return response.secure_url;

    } catch (error) {
        console.log("error : " + error);
        fs.unlinkSync(localFilePath) // remove temporary file
        return null

    }
}

export default uploadToCloudinary; 