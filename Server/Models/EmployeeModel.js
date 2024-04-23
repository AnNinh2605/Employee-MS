import mongoose from 'mongoose';
const { Schema } = mongoose;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    salary: Number,
    address: String,
    image: String,
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'CategoryModel'
    },
    role: String
});

const EmployeeModel = mongoose.model('Employee', employeeSchema);

export default EmployeeModel;