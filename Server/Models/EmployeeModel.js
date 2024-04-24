import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose);

const { Schema } = mongoose;

const employeeSchema = new Schema(
    {
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
    }, 
);

employeeSchema.plugin(AutoIncrement, { inc_field: 'employee_id' });

const EmployeeModel = mongoose.model('Employee', employeeSchema);

export default EmployeeModel;