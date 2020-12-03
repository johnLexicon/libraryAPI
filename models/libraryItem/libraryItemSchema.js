const mongoose = require('mongoose');

const libraryItemSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: {type: String },
    pages: {type: Number},
    runtimeMinutes: {type: Number},
    isBorrowable: {type: Boolean},
    borrower: {type: String},
    borrowDate: {type: Date},
    itemType: {type: String, required: true},
    categoryId: {type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Category' }
}, {collection: "LibraryItem"});

module.exports = mongoose.model("LibraryItem", libraryItemSchema);