const Category = require('./categorySchema');

exports.categoryExistsCheck = async (req, res, next) => {
    try{
        const result = await Category.find({ "categoryName" : { $regex : new RegExp(req.body.categoryName, "i") } });
        if(result.length > 0){
            throw new Error('Category name exists already')
        }
        next();
    }catch(error){
        res.status(422).send({errorMessage: error.message});
    }
}

exports.getCategories = async (req, res, next) => {
    try{
        const categories = await Category.find();
        res.status(200).send(categories);
    }catch(error){
        next(error);
    }
}

exports.getCategory = async (req, res, next) => {
    try{
        const category = await Category.findById(req.params.id);
        if(!category){
            return res.status(422).send({errorMessage: `No category with id: ${req.params.id} was found`});
        }
        res.status(200).send(category);
    }catch(error){
        next(error);
    }
}

exports.addCategory = async (req, res, next) => {
    try{
        const category = await Category.create(req.body)
        res.status(201).send(category);
    } catch(error){
        next(error)
    }
}

exports.editCategory = async (req, res, next) => {
    try{
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {new : true, useFindAndModify: false });
        if(!category){
            return res.status(422).send({errorMessage: `No category with id: ${req.params.id} was found`});
        }
        res.status(200).send(category);
    } catch(error){
        next(error)
    }
}