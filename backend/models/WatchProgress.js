const mongoose = require('mongoose');

const WatchProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    progressSeconds: { // كم ثانية شاهد
        type: Number,
        default: 0
    },
    totalDuration: { // مدة الفيلم كاملة
        type: Number,
        required: true
    },
    finished: { // هل أنهاه؟
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// هذا يمنع المستخدم من إضافة سجلين لنفس الفيلم
WatchProgressSchema.index({ userId: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model('WatchProgress', WatchProgressSchema);