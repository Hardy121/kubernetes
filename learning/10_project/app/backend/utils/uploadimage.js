const cloudinary = require('cloudinary').v2

async function uploadImage(path) {
    try {
        cloudinary.config({
            cloud_name: 'dwijqolts',
            api_key: '588771822569498',
            api_secret: 'eaPVAyno0RUd0FHBOAVSVjLQzTY'
        });
        const uploadResult = await cloudinary.uploader.upload(path, {
            folder: 'blog app',
        })

        return uploadResult
    } catch (error) {
        console.log(error)
    }

}

async function deleteCloudinaryImage(image) {
    try {
        const uploadResult = await cloudinary.uploader.destroy(image)
    } catch (error) {
        console.log(error)
    }
}
module.exports = { uploadImage, deleteCloudinaryImage }