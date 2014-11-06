'use strict';

//Ipthosts service used to communicate Ipthosts REST endpoints
angular.module('ipthosts').factory('Ipthosts', ['$resource',
	function($resource) {
		return $resource('ipthosts/:ipthostId', { ipthostId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);