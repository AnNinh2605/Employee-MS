import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: String
});

const CategoryModel = mongoose.model('Category', categorySchema);

export default CategoryModel;