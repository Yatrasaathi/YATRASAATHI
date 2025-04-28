// models/feedbackModel.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    rating:{
        type:String,
        required: true,
        trim: true,
    },
    experience:{
        type:String,
        required: true,
        trim: true,
    },
    guideRating: {
        type:Number,
        required: true,
        trim: true,
    },
    photoUpload: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
