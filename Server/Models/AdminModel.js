import mongoose from 'mongoose';
const { Schema } = mongoose;

const adminSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: String
});

const AdminModel = mongoose.model('Admin', adminSchema);

export default AdminModel;