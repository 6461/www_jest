var express = require('express');
var router = express.Router();

// require controller
var itemController = require('../controllers/itemController');

// GET request for list of all items
router.get('/item/list', itemController.item_list);

// POST request for creating an item
router.post('/item/create', itemController.item_create);

// POST request to delete item
router.post('/item/delete', itemController.item_delete);

// GET request for one item
router.get('/item/:id', itemController.item_get);

module.exports = router;
