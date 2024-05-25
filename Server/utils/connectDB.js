import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log(`Connection to DB successful`);
    } catch (error) {
        console.log("Connection to DB fail", error);
    }
}

export default connectDB;
