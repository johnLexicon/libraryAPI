const router = require("express").Router();
const categoryModel = require('../models/category/categoryModel');

router.get('/', categoryModel.getCategories);

router.get('/:id', categoryModel.getCategory);

router.post('/', categoryModel.categoryExistsCheck, categoryModel.addCategory);

router.put('/:id', categoryModel.categoryExistsCheck, categoryModel.editCategory);
module.exports = router;