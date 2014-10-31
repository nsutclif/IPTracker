'use strict';

//Setting up route
angular.module('hosts').config(['$stateProvider',
	function($stateProvider) {
		// Hosts state routing
		$stateProvider.
		state('listHosts', {
			url: '/hosts',
			templateUrl: 'modules/hosts/views/list-hosts.client.view.html'
		}).
		state('createHost', {
			url: '/hosts/create',
			templateUrl: 'modules/hosts/views/create-host.client.view.html'
		}).
		state('viewHost', {
			url: '/hosts/:hostId',
			templateUrl: 'modules/hosts/views/view-host.client.view.html'
		}).
		state('editHost', {
			url: '/hosts/:hostId/edit',
			templateUrl: 'modules/hosts/views/edit-host.client.view.html'
		});
	}
]);