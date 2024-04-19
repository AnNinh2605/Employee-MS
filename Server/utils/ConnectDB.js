import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:${process.env.DB_PORT}/${process.env.DB_NAME}`);
        console.log("Connection to DB successful");
    } catch (error) {
        console.log("Connection to DB fail", error);
    }
}

export default connectDB;