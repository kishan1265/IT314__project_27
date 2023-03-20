const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlenght: 5,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isMember: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true }
);

const userdb = mongoose.model('User', User);
module.exports = userdb;
