const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
    },
    password: String,
    blog: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
        },
    ]
})

const User = mongoose.model('User', userSchema);

module.exports = { User };