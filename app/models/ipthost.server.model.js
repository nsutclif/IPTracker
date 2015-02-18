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
	},
	alertOnChange: {
		type: Boolean,
		default: true
	},
	alertTimeoutMinutes: {
		type: Number,
		min: 0,
		max: 1440
	},
    alertTimeout: {
        type:Date
    },
    alertTimeoutSent: {
        type: Boolean,
        default: false
    },
	lastEventTime: {
		type: Date
	},
	lastEventIP: {
		type: String
	}
});

mongoose.model('Ipthost', IpthostSchema);
