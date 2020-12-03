const mongoose = require('mongoose');
const LibraryItem = require('./libraryItemSchema');

exports.getLibraryItems = async (req, res, next) => {
    try{
        const libraryItems = await LibraryItem.find();
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
        res.status(200).send(deletedItem);
    } catch(error){
        next(error);
    }
}