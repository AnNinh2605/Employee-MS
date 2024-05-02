import mongoose from 'mongoose';

const { Schema } = mongoose;

const departmentSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    }
}
);

const DepartmentModel = mongoose.model('Department', departmentSchema);

export default DepartmentModel;