const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        imageId: {
            type: String,
            required: true
        },
        draft: {
            type: Boolean,
            default: false
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    { timestamps: true }
)

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog