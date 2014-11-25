'use strict';

// Configuring the Articles module
angular.module('ipthosts').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Hosts', 'ipthosts', 'dropdown', '/ipthosts(/create)?');
		Menus.addSubMenuItem('topbar', 'ipthosts', 'List Hosts', 'ipthosts');
		Menus.addSubMenuItem('topbar', 'ipthosts', 'New Host', 'ipthosts/create');
	}
]);
