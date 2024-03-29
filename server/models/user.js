const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    favoriteAuthors: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'UserAuthor'}
    ]
});

module.exports = mongoose.model.Users || mongoose.model('User', userSchema);