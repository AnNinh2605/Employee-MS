import mongoose from 'mongoose';

const { Schema } = mongoose;

const positionSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    }
}
);

const PositionModel = mongoose.model('Position', positionSchema);

export default PositionModel;