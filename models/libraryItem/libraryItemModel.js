const mongoose = require('mongoose');
const LibraryItem = require('./libraryItemSchema');
const Category = require('../category/categorySchema');

exports.getLibraryItems = async (req, res, next) => {
    try{
        const libraryItems = await LibraryItem.find({categoryId: req.params.categoryId}).sort('itemType');
        res.status(200).send(libraryItems);
    }catch(error){
        next(error);
    }
}

exports.getLibraryItem = async (req, res, next) => {
    try{
        const libraryItem = await LibraryItem.findById({_id: req.params.id});
        if(!libraryItem){
            return res.status(422).send({errorMessage: `No library item with id: ${req.params.id} was found`});
        }
        res.status(200).send(libraryItem);
    } catch(error) {
        next(error);
    }
}

exports.addLibraryItem = async (req, res, next) => {
    try{
        const itemToAdd = Object.assign({ categoryId: req.params.categoryId }, req.body);
        const libraryItem = await LibraryItem.create(itemToAdd);
        // Mandatory to add the library item id into the Category model to be able to use populate method in Category model.
        await Category.findByIdAndUpdate(req.params.categoryId, {
            $push: { libraryItems: libraryItem._id }
        }, { safe: true, upsert: true});
        res.status(201).send(libraryItem);
    } catch(error){
        next(error)
    }
}

exports.deleteLibraryItem = async (req, res, next) => {
    try{
        const deletedItem = await LibraryItem.findByIdAndDelete(req.params.id, { useFindAndModify: false })
        if(!deletedItem){
            return res.status(422).send({errorMessage: `No library item with id: ${req.params.id} was found`})
        }
        // Must even remove the id from the Category model.
        await Category.findByIdAndUpdate(req.params.categoryId, {"$pull": { libraryItems: deletedItem._id }})
        res.status(200).send(deletedItem);
    } catch(error){
        next(error);
    }
}