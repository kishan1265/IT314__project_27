// export mongoose model
const mongoose = require('mongoose');
// create a blog schema

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter blog title'],
        trim: true,
        maxlength: [100, 'Blog title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please enter blog description'],
        maxlength: [5000, 'Blog description cannot exceed 500 characters']
    },
    photo: {
        type: String,
        default: 'no-photo.jpg',
        required: false,
    },
    body: {
        type: String,
        required: [true, 'Please enter blog body']
    },
    username: {
        type: String,
        required: [true, 'Please enter username']
    },
    catagories: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // user: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'User',
    //     required: true
    // }

},{timestamps: true}
);
const resourcedb= mongoose.model('resourceSchema',resourceSchema);

module.exports=resourcedb;

// const resourceSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: [true, 'Please enter resource name'],
//         trim: true,
//         maxlength: [100, 'Resource name cannot exceed 100 characters']
//     },
//     description: {
//         type: String,
//         required: [true, 'Please enter resource description'],
//         maxlength: [500, 'Resource description cannot exceed 500 characters']
//     },
//     link: {
//         type: String,
//         required: [true, 'Please enter resource link'],
//         maxlength: [500, 'Resource link cannot exceed 500 characters']
//     },
//     type: {
//         type: String,
//         required: [true, 'Please enter resource type'],
//         enum: {
//             values: [
//                 'Video',
//                 'Book',
//                 'Podcast',
//                 'Article'
//             ],
//             message: 'Please select correct resource type for resource'
//         }
//     },
//     rating: {
//         type: Number,
//         min: [1, 'Rating must be at least 1'],
//         max: [10, 'Rating cannot exceed 10']
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
//     user: {
//         type: mongoose.Schema.ObjectId,
//         ref: 'User',
//         required: true
//     }
    
// },{timestamps: true}
// );
