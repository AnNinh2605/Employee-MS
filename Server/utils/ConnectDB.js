import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Employee_MS');
        console.log("Connection to DB successful");
    } catch (error) {
        console.log("Connection to DB fail", error);
    }
}

export default connectDB;