import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImageClodinary = async (image) => {
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

    const uploadImage = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'pakhtoonmart' },
            (error, uploadResult) => {
                if (error) {
                    return reject(error);
                }

                return resolve(uploadResult);
            }
        );

        stream.end(buffer);
    });

    return uploadImage;
};

export default uploadImageClodinary;