const express = require('express');
const { getAllUsers, createUser, getUserById, deleteUser, updateUser, login } = require('../controller/userController');
const router = express.Router();

router.get('/users', getAllUsers);
router.get('/user/:id', getUserById)

router.post('/user', createUser)
router.post('/user/login', login)


router.delete('/user/:id', deleteUser)

router.put('/user/:id', updateUser)

module.exports = router
