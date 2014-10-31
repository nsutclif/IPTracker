'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Host = mongoose.model('Host'),
	_ = require('lodash');

/**
 * Create a Host
 */
exports.create = function(req, res) {
	var host = new Host(req.body);
	host.user = req.user;

	host.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(host);
		}
	});
};

/**
 * Show the current Host
 */
exports.read = function(req, res) {
	res.jsonp(req.host);
};

/**
 * Update a Host
 */
exports.update = function(req, res) {
	var host = req.host ;

	host = _.extend(host , req.body);

	host.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(host);
		}
	});
};

/**
 * Delete an Host
 */
exports.delete = function(req, res) {
	var host = req.host ;

	host.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(host);
		}
	});
};

/**
 * List of Hosts
 */
exports.list = function(req, res) { Host.find().sort('-created').populate('user', 'displayName').exec(function(err, hosts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(hosts);
		}
	});
};

/**
 * Host middleware
 */
exports.hostByID = function(req, res, next, id) { Host.findById(id).populate('user', 'displayName').exec(function(err, host) {
		if (err) return next(err);
		if (! host) return next(new Error('Failed to load Host ' + id));
		req.host = host ;
		next();
	});
};

/**
 * Host authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.host.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};