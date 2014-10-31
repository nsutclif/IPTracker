'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var hosts = require('../../app/controllers/hosts');

	// Hosts Routes
	app.route('/hosts')
		.get(hosts.list)
		.post(users.requiresLogin, hosts.create);

	app.route('/hosts/:hostId')
		.get(hosts.read)
		.put(users.requiresLogin, hosts.hasAuthorization, hosts.update)
		.delete(users.requiresLogin, hosts.hasAuthorization, hosts.delete);

	// Finish by binding the Host middleware
	app.param('hostId', hosts.hostByID);
};