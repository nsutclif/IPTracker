'use strict';

//Hosts service used to communicate Hosts REST endpoints
angular.module('hosts').factory('Hosts', ['$resource',
	function($resource) {
		return $resource('hosts/:hostId', { hostId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);