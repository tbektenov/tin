const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    books: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Book'}
    ]
});

module.exports = mongoose.model.authors || mongoose.model('Author', authorSchema);