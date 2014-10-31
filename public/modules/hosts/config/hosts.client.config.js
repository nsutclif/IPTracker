'use strict';

// Configuring the Articles module
angular.module('hosts').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Hosts', 'hosts', 'dropdown', '/hosts(/create)?');
		Menus.addSubMenuItem('topbar', 'hosts', 'List Hosts', 'hosts');
		Menus.addSubMenuItem('topbar', 'hosts', 'New Host', 'hosts/create');
	}
]);