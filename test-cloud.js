import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: 'domyx6ucm',
    api_key: '735345978349458',
    api_secret: 'gvrs4M7Ils0Ao0L4-caXmqG_ZDg'
});

async function testUpload() {
    try {
        console.log("Testing upload...");
        const result = await cloudinary.uploader.upload('./public/Textures/bday_cake.png', {
            resource_type: "auto",
            folder: "3d_portfolio"
        });
        console.log("✅ Upload successful:", result.secure_url);
    } catch (error) {
        console.error("❌ Upload failed:", error);
    }
}

testUpload();
