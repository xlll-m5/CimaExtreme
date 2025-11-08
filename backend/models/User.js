const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie' // هذا يربطها بنموذج "الأفلام"
    }],
    watchLater: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);