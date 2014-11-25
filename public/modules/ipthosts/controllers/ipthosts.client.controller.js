'use strict';

// Ipthosts controller
angular.module('ipthosts').controller('IpthostsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Ipthosts',
	function($scope, $stateParams, $location, Authentication, Ipthosts ) {
		$scope.authentication = Authentication;

		// Create new Ipthost
		$scope.create = function() {
			// Create new Ipthost object
			var ipthost = new Ipthosts ({
				name: this.name,
				alertOnChange: this.alertOnChange,
				alertTimeoutMinutes: this.alertTimeoutMinutes
			});

			// Redirect after save
			ipthost.$save(function(response) {
				$location.path('ipthosts/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Ipthost
		$scope.remove = function( ipthost ) {
			if ( ipthost ) { ipthost.$remove();

				for (var i in $scope.ipthosts ) {
					if ($scope.ipthosts [i] === ipthost ) {
						$scope.ipthosts.splice(i, 1);
					}
				}
			} else {
				$scope.ipthost.$remove(function() {
					$location.path('ipthosts');
				});
			}
		};

		// Update existing Ipthost
		$scope.update = function() {
			var ipthost = $scope.ipthost ;

			ipthost.$update(function() {
				$location.path('ipthosts/' + ipthost._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Ipthosts
		$scope.find = function() {
			$scope.ipthosts = Ipthosts.query();
		};

		// Find existing Ipthost
		$scope.findOne = function() {
			$scope.ipthost = Ipthosts.get({ 
				ipthostId: $stateParams.ipthostId
			});
		};

		$scope.getUpdateURL = function( ipthost ) {
			return $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/e/' + ipthost._id;
		}
	}
]);
