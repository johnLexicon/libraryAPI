const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryName: { type: String, required: true, unique: true },
    libraryItems: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'LibraryItem '}]
}, {collection: "Category"});

module.exports = mongoose.model("Category", categorySchema);