const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: { type: String, required: true },
    popularBooks: { type: String }
});
module.exports = mongoose.model('Author', authorSchema);