// export mongoose model
const mongoose = require('mongoose');
const conn = require('../db/connectdb.js').connectdb;

const ResourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'resource title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: true,
      maxlength: [5000, 'resource description cannot exceed 5000 characters'],
    },
    link: {
      type: String,
      required: true,
    },
    // likes: {
    //     type: Number,
    //     required: false,
    // },
    // sanitizedHtml:{
    //     type: String,
    //     required: true
    //   },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // sanitizedHtml: {
    //     type: String,
    //     required: true
    // },
    // user: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'User',
    //     required: true
    // }
  },
  { timestamps: true }
);

const resourcedb = conn.model('ResourceSchema', ResourceSchema);

module.exports = resourcedb;
