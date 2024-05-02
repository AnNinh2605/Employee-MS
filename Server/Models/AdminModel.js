import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "username is required"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "password is required"]
        },
        role: {
            type: String,
            required: [true, "role is required"],
            enum: ['admin', 'manager', 'staff']
        }
    },
);

const AdminModel = mongoose.model('Admin', adminSchema);

export default AdminModel;