import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    }
});

const CategoryModel = mongoose.model('Category', categorySchema);

export default CategoryModel;