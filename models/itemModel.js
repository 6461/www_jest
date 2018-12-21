var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ItemSchema = new Schema({
	name: {
		type:		String,
		required:	true,
		max:		100}
});

module.exports = mongoose.model('Item', ItemSchema);