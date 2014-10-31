'use strict';

// Hosts controller
angular.module('hosts').controller('HostsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Hosts',
	function($scope, $stateParams, $location, Authentication, Hosts ) {
		$scope.authentication = Authentication;

		// Create new Host
		$scope.create = function() {
			// Create new Host object
			var host = new Hosts ({
				name: this.name
			});

			// Redirect after save
			host.$save(function(response) {
				$location.path('hosts/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Host
		$scope.remove = function( host ) {
			if ( host ) { host.$remove();

				for (var i in $scope.hosts ) {
					if ($scope.hosts [i] === host ) {
						$scope.hosts.splice(i, 1);
					}
				}
			} else {
				$scope.host.$remove(function() {
					$location.path('hosts');
				});
			}
		};

		// Update existing Host
		$scope.update = function() {
			var host = $scope.host ;

			host.$update(function() {
				$location.path('hosts/' + host._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Hosts
		$scope.find = function() {
			$scope.hosts = Hosts.query();
		};

		// Find existing Host
		$scope.findOne = function() {
			$scope.host = Hosts.get({ 
				hostId: $stateParams.hostId
			});
		};
	}
]);