'use strict';

//Setting up route
angular.module('ipthosts').config(['$stateProvider',
	function($stateProvider) {
		// Ipthosts state routing
		$stateProvider.
		state('listIpthosts', {
			url: '/ipthosts',
			templateUrl: 'modules/ipthosts/views/list-ipthosts.client.view.html'
		}).
		state('createIpthost', {
			url: '/ipthosts/create',
			templateUrl: 'modules/ipthosts/views/create-ipthost.client.view.html'
		}).
		state('viewIpthost', {
			url: '/ipthosts/:ipthostId',
			templateUrl: 'modules/ipthosts/views/view-ipthost.client.view.html'
		}).
		state('editIpthost', {
			url: '/ipthosts/:ipthostId/edit',
			templateUrl: 'modules/ipthosts/views/edit-ipthost.client.view.html'
		});
	}
]);