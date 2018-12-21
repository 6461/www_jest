var Item = require('../models/itemModel');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.item_list = function(req, res, next) {
	Item.find()
	.exec(function (err, item_list) {
		if (err) {
			res.status(500).send({error: 'Error getting list'});
			return next(err);
		} else {
			// Successful
			res.status(200).json(item_list);
		}
	});
};

exports.item_get = function(req, res, next) {
	Item.findById(req.params.id)
	.exec(function (err, item) {
		if (err) {
			res.status(500).send({error: 'Error getting item'});
			return next(err);
		} else {
			// Successful
			res.status(200).json(item);
		}
	});
};

exports.item_create =  [
	// Validate that the name field is not empty.
	body('name', 'Item name required').isLength({ min: 1 }).trim(),

	// Sanitize (trim and escape) the name field.
	sanitizeBody('name').trim().escape(),

	// Process request after validation and sanitization.
	(req, res, next) => {
		// Extract the validation errors from a request.
		const errors = validationResult(req);

		// Create an item object with escaped and trimmed data.
		var item = new Item(
		{ name: req.body.name }
		);

		if (!errors.isEmpty()) {
			// There are errors.
			res.status(500).send({error: 'Error creating item'});
			return;
		} else {
			// Data from form is valid.
			item.save(function (err) {
				if (err) {
					res.status(500).send({error: 'Error creating item'});
					return next(err);
				} else {
					// Successful
					res.status(200).json(item);
				}
			});
		}
	}
];

exports.item_delete = function(req, res, next) {
	Item.findByIdAndRemove(req.body.id, function deleteItem(err) {
		if (err) {
			res.status(500).send({error: 'Error deleting item'});
			return next(err);
		} else {
			// Successful
			// res.status(200).json(item);
			res.json({success: true});
		}
	});
};
