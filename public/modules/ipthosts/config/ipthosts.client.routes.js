'use strict';

//Setting up route
angular.module('ipthosts').config(['$stateProvider',
	function($stateProvider) {
		// Ipthosts state routing
		$stateProvider.
		state('createIpthost', {
			url: '/ipthosts/create',
			templateUrl: 'modules/ipthosts/views/create-ipthost.client.view.html'
		}).
		state('editIpthost', {
			url: '/ipthosts/:ipthostId/edit',
			templateUrl: 'modules/ipthosts/views/edit-ipthost.client.view.html'
		});
	}
]);
