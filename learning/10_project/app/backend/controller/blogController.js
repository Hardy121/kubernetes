const Blog = require("../models/blogSchema");
const { User } = require("../models/userSchema");
const { decodeJwt } = require("../utils/generateJWT");
const uploadImage = require("../utils/uploadimage");
const fs = require('fs')

async function createBlog(req, res) {
    try {
        const { title, description, draft } = req.body;
        const image = req.file

        if (!title || !description) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const checkVerify = req.headers.authorization
        const token = checkVerify.split(' ')[1]

        const decode = await decodeJwt(token)

        const creator = decode?.id

        const findUser = await User.findById(creator)

        if (!findUser) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        
        const url = await uploadImage(image?.path)
      
        fs.unlinkSync(image?.path)

        const createdBlog = await Blog.create({
            title,
            description,
            draft,
            creator,
            image: url?.secure_url,
            imageId: url?.public_id
        })


        await User.findByIdAndUpdate(creator, { $push: { blog: createdBlog._id } })

        return res.status(200).json({
            message: "blog created successfully",
            blog: createdBlog
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}

async function readAllBlog(req, res) {
    try {
        const allBlog = await Blog.find({ draft: false }).populate({
            path: 'creator',
            select: "name email"
        })
        return res.status(200).json({
            message: "blog fetched successfully",
            blog: allBlog
        })
    } catch (error) {
        console.log(error)
    }
}

async function readBlogById(req, res) {
    try {
        const { id } = req.params
        const blog = await Blog.findById(id)

        if (!blog) {
            return res.status(400).json({
                message: "blog not exist",

            })
        }

        return res.status(200).json({
            message: "blog fetched successfully",
            blog
        })
    } catch (error) {
        console.log(error)
    }
}
async function upadateBlog(req, res) {
    try {
        const { id } = req.params
        const { title, description, draft } = req.body;

        const updateBlog = await Blog.findByIdAndUpdate(id, {
            title,
            description,
            draft
        })

        if (!updateBlog) {
            return res.status(400).json({
                message: "blog not exist"
            })
        }

        return res.status(200).json({
            message: "blog updated successfully",
            updateBlog
        })
    } catch (error) {
        console.log(error)
    }
}

async function deleteBlog(req, res) {
    try {
        const { id } = req.params
        const deletedBlog = await Blog.findByIdAndDelete(id)

        if (!deletedBlog) {
            return res.status(400).json({
                message: "blog not exist"
            })
        }

        await uploadImage.deleteCloudinaryImage(deleteBlog?.imageId)

        return res.status(200).json({
            message: "blog deleted successfully",
            deletedBlog
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    readAllBlog,
    createBlog,
    readBlogById,
    upadateBlog,
    deleteBlog
}