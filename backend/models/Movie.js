const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    posterPath: {
        type: String,
        required: true
    },
    moviePath: {
        type: String,
        required: true
    },
    genre: { // "النوع" (أكشن، دراما)
        type: [String],
        default: []
    },
    rating: { // "التقييم" (مثل 8.5)
        type: Number,
        default: 0
    },
    classification: { // "التصنيف" (مثل عائلي)
        type: String,
        default: 'N/A'
    },
    country: {
        type: String,
        default: 'Unknown'
    },
    year: {
        type: Number
    },
}, { timestamps: true }); // <-- يجب أن تكون "timestamps" هنا مرة واحدة فقط

module.exports = mongoose.model('Movie', MovieSchema);