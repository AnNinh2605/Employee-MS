import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log(`Connection to ${process.env.MONGODB_URL} successful`);
    } catch (error) {
        console.log("Connection to DB fail", error);
    }
}

export default connectDB;