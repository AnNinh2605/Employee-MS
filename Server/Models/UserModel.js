import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String, 
        unique: true
    },
    password: String
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;