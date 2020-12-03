const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryName: { type: String, required: true, unique: true }
}, {collection: "Category"});

module.exports = mongoose.model("Category", categorySchema);