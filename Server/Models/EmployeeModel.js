import mongoose from 'mongoose';
const { Schema } = mongoose;

const employeeSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
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