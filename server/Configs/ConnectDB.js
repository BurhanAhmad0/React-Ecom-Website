const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => { console.log('Database Connected') })
        await mongoose.connect(`${process.env.MONGODB_URI}/Exclusive`);
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit the process with failure
    }
}

module.exports = connectDB;
