const mongoose = require('mongoose');

async function connectDb() {
    try {
        await mongoose.connect('mongodb://mongodb-service:27017/myDataBase')
        console.log('database connected')
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb
