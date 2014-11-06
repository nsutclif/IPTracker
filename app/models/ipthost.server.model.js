'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Ipthost Schema
 */
var IpthostSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Ipthost name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Ipthost', IpthostSchema);