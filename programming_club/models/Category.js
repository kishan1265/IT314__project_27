// export mongoose model
const mongoose = require('mongoose');
// create a blog schema

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required:false,
        trim: true,
        maxlength: [100, 'Category name cannot exceed 100 characters']
    },
},{timestamps: true}
);
const Categorydb= mongoose.model('CategorySchema',CategorySchema);

module.exports=Categorydb;

