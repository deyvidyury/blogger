var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: {type: String, default: ''},
	body: {type: String, default: ''},
	create_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: ''}
})

module.exports = mongoose.model('posts', PostSchema);