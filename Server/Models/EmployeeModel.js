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
        phone: {
            type: String,
        },
        DOB: {
            type: Date
        },
        address: String,
        department_id: {
            type: Schema.Types.ObjectId,
            ref: 'DepartmentModel'
        },
        position_id: {
            type: Schema.Types.ObjectId,
            ref: 'PositionModel'
        },
        start_date: {
            type: Date
        },
        salary: Number
    }
);

employeeSchema.plugin(AutoIncrement, { inc_field: '_id' });

const EmployeeModel = mongoose.model('Employee', employeeSchema);

export default EmployeeModel;