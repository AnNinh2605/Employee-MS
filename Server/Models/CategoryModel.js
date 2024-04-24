import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose);

const { Schema } = mongoose;

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"]
        }
    }, 
);

categorySchema.plugin(AutoIncrement, { inc_field: 'category_id' });

const CategoryModel = mongoose.model('Category', categorySchema);

export default CategoryModel;