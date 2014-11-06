'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Ipthost = mongoose.model('Ipthost'),
	_ = require('lodash');

/**
 * Create a Ipthost
 */
exports.create = function(req, res) {
	var ipthost = new Ipthost(req.body);
	ipthost.user = req.user;

	ipthost.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ipthost);
		}
	});
};

/**
 * Show the current Ipthost
 */
exports.read = function(req, res) {
	res.jsonp(req.ipthost);
};

/**
 * Update a Ipthost
 */
exports.update = function(req, res) {
	var ipthost = req.ipthost ;

	ipthost = _.extend(ipthost , req.body);

	ipthost.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ipthost);
		}
	});
};

/**
 * Delete an Ipthost
 */
exports.delete = function(req, res) {
	var ipthost = req.ipthost ;

	ipthost.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ipthost);
		}
	});
};

/**
 * List of Ipthosts
 */
exports.list = function(req, res) { Ipthost.find().sort('-created').populate('user', 'displayName').exec(function(err, ipthosts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ipthosts);
		}
	});
};

/**
 * Ipthost middleware
 */
exports.ipthostByID = function(req, res, next, id) { Ipthost.findById(id).populate('user', 'displayName').exec(function(err, ipthost) {
		if (err) return next(err);
		if (! ipthost) return next(new Error('Failed to load Ipthost ' + id));
		req.ipthost = ipthost ;
		next();
	});
};

/**
 * Ipthost authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.ipthost.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};