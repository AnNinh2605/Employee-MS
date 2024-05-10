import mongoose from 'mongoose';

const { Schema } = mongoose;

const positionSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    department_id: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    }
}
);

const PositionModel = mongoose.model('Position', positionSchema);

export default PositionModel;