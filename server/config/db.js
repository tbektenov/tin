const mongoose = require('mongoose');

/**
 * 
 * Connection to the database.
 * 
 */

const connectDB = async () => {

    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`DB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }

}

module.exports = connectDB;