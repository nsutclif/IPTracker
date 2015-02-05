'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Ipthost = mongoose.model('Ipthost'),
	_ = require('lodash'),
	config = require('../../config/config'),
	nodemailer = require('nodemailer');

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

function internalSave(ipthost,res) {
    if (ipthost.alertTimeoutMinutes===0) {
        delete ipthost.alertTimeout;
    } else {
        var lastEventTime = new Date(ipthost.lastEventTime);
        ipthost.alertTimeout = new Date(lastEventTime.getTime() + ipthost.alertTimeoutMinutes * 60 * 1000);
    }

    ipthost.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(ipthost);
        }
    });
}

/**
 * Update a Ipthost
 */
exports.update = function(req, res) {
	var ipthost = req.ipthost ;

	ipthost = _.extend(ipthost , req.body);

    return internalSave(ipthost, res);
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
exports.list = function(req, res) {
	Ipthost
		.find({ user: req.user.id })
		.sort('-created')
		.populate('user', 'displayName')
		.exec(function(err, ipthosts) {
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

function getClientIP(req) {
	// Copied and adapted from StackOverflow
	var ipAddress;
	// Amazon EC2 / Heroku workaround to get real client IP
	console.log(req);
	var forwardedIpsStr = req.headers['x-forwarded-for'];
	if (forwardedIpsStr) {
		// 'x-forwarded-for' header may return multiple IP addresses in
		// the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
		// the first one
		var forwardedIps = forwardedIpsStr.split(',');
		ipAddress = forwardedIps[0];
	}
	if (!ipAddress) {
		// Ensure getting client IP address still works in
		// development environment
		ipAddress = req.connection.remoteAddress;
	}
	return ipAddress;
}

function handleChangedIP(ipthost, prevIP, user) {
	if (!ipthost.alertOnChange)
	  return;

	// FUTURE:
	// - Put emails in a queue and have a separate service sending emails.

	var transporter = nodemailer.createTransport(config.mailer.options);

	var ipChangeEmail = {
		from: config.mailer.from,
		to: user.email,
		subject: 'New IP Address for ' + ipthost.name,
		text: 'Previous IP Address: ' + prevIP + '\n' + 'New IP Address: ' + ipthost.lastEventIP
	};

	transporter.sendMail(ipChangeEmail, function(error, info){
		if(error){
			console.log(error);
		}else{
			console.log('Message sent: ' + info.response);
		}
	});
}

/**
 * Log an event for the Ipthost
 */

exports.logEvent = function(req, res) {
	var ipthost = req.ipthost;

	var prevIP = ipthost.lastEventIP;

	ipthost.lastEventIP = getClientIP(req);
	ipthost.lastEventTime = new Date();

	if ((typeof prevIP !== 'undefined') && (ipthost.lastEventIP !== prevIP)) {
		handleChangedIP(ipthost, prevIP, req.user);
	}

    console.log(JSON.stringify(ipthost));
	return internalSave(ipthost, res);
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
