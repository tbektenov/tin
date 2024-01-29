const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// junction table

const userAuthorSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Author'
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model.userAuthors || mongoose.model('userAuthor', userAuthorSchema)