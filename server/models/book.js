const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Author'
    }
});

module.exports = mongoose.model.Books || mongoose.model('Book', bookSchema);