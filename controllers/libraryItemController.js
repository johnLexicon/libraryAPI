const router = require("express").Router({ mergeParams: true });
const libraryItemModel = require('../models/libraryItem/libraryItemModel');

router.get('/', libraryItemModel.getLibraryItems);

router.get('/:id', libraryItemModel.getLibraryItem);

router.post('/', libraryItemModel.addLibraryItem);

router.patch('/:id', libraryItemModel.editLibraryItem);

router.delete('/:id', libraryItemModel.deleteLibraryItem);

module.exports = router;
