'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var ipthosts = require('../../app/controllers/ipthosts');

	// Ipthosts Routes
	app.route('/ipthosts')
		.get(ipthosts.list)
		.post(users.requiresLogin, ipthosts.create);

	app.route('/ipthosts/:ipthostId')
		.get(ipthosts.read)
		.put(users.requiresLogin, ipthosts.hasAuthorization, ipthosts.update)
		.delete(users.requiresLogin, ipthosts.hasAuthorization, ipthosts.delete);

	app.route('/e/:ipthostId')
		.get(ipthosts.logEvent);

	// Finish by binding the Ipthost middleware
	app.param('ipthostId', ipthosts.ipthostByID);

};



// does it make any sense to add iptevent in here?
