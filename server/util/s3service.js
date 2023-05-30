import dotenv from "dotenv/config"
import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: 'eu-north-1'
});

const s3 = new AWS.S3();
const bucketName = 'dybdestegte-bucket'

export async function uploadImage(file) {
    const fileToSend = {
        Bucket: bucketName,
        Key: file.originalname,
        Body: file.buffer
    };
    try {
        const data = await s3.upload(fileToSend).promise();
        return data.Location;
    } catch (error) {
        console.log(error);
    }
}

