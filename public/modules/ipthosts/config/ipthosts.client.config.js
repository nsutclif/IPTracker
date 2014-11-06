'use strict';

// Configuring the Articles module
angular.module('ipthosts').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Ipthosts', 'ipthosts', 'dropdown', '/ipthosts(/create)?');
		Menus.addSubMenuItem('topbar', 'ipthosts', 'List Ipthosts', 'ipthosts');
		Menus.addSubMenuItem('topbar', 'ipthosts', 'New Ipthost', 'ipthosts/create');
	}
]);