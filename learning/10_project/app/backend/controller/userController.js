const { User } = require("../models/userSchema.js")
const bcrypt = require('bcrypt')
const { generateJwt } = require("../utils/generateJWT.js")

async function getAllUsers(req, res) {

    const getAllUsers = await User.find({})
    try {
        return res.status(200).json({
            message: "all users",
            data: getAllUsers
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error accurred while getting the users"
        })
    }
}

async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const findUser = await User.findById(id);
        if (!findUser) {
            return res.status(404).json({
                message: 'User not exist'
            })
        }
        // const relation = await User.aggregate([
        //     {$match : {}}
        // ])

        return res.status(200).json({
            message: 'user find successfully',
            user: findUser
        })

    } catch (error) {
        console.log(error)
    }
}

async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(404).json({
                message: 'User already exist'
            })
        }

        if (!name || !email || !password) {
            return res.status(404).json({
                message: 'All fields are required'
            })
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const token = await generateJwt({
            email: user?.email,
            id: user?._id
        })

        return res.status(200).json({
            message: 'user created successfully',
            user: {
                name: user?.name,
                email: user?.email
            },
            token
        })


    } catch (error) {

        console.log(error)
        return res.status(400).json({
            message: 'error while creating user',
        })
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json({
                message: 'All fields are required'
            })
        }
        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return res.status(404).json({
                message: 'User is not exist with this email'
            })
        }

        const checkForPass = await bcrypt.compare(password, existingUser.password);

        if (!checkForPass) {
            return res.status(404).json({
                message: 'Incorrect password'
            })
        }

        const token = await generateJwt({
            email: existingUser?.email,
            id: existingUser?._id
        })
        return res.status(200).json({
            message: 'User Login successfully',
            user: {
                name: existingUser?.name,
                email: existingUser?.email
            },
            token
        })


    } catch (error) {

        console.log(error)
        return res.status(400).json({
            message: 'error while creating user',

        })
    }
}

async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        const deleteUser = await User.findByIdAndDelete(id)
        if (!deleteUser) {
            return res.status(404).json({
                message: 'User not exist'
            })
        }

        return res.status(200).json({
            message: 'user delete successfully',
            user: deleteUser
        })


    } catch (error) {
        console.log(error)
    }
}

async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(404).json({
                message: 'All fields are required'
            })
        }

        const upadateUser = await User.findByIdAndUpdate(id, { name, email, password })

        if (!upadateUser) {
            return res.status(404).json({
                message: 'User not exist'
            })
        }


        return res.status(200).json({
            message: 'User updated successfully',
            user: upadateUser
        })



    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    deleteUser,
    updateUser,
    login
}