const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryName: { type: String }
}, {collection: "Category"});

module.exports = mongoose.model("Category", categorySchema);