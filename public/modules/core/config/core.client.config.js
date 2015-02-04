'use strict';

// Configuring the Articles module
angular.module('core').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'About', 'about', 'item', 'about', true/*isPublic*/);
    }
]);
