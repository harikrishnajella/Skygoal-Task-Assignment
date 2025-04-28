const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI

const DBconnection = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log(`MongoDB connected successfully...`)
    } catch (error) {
        console.log(`MongoDB connection failed ${error.message}`)
    }
}

module.exports = DBconnection

