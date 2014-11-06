'use strict';

(function() {
	// Ipthosts Controller Spec
	describe('Ipthosts Controller Tests', function() {
		// Initialize global variables
		var IpthostsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Ipthosts controller.
			IpthostsController = $controller('IpthostsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Ipthost object fetched from XHR', inject(function(Ipthosts) {
			// Create sample Ipthost using the Ipthosts service
			var sampleIpthost = new Ipthosts({
				name: 'New Ipthost'
			});

			// Create a sample Ipthosts array that includes the new Ipthost
			var sampleIpthosts = [sampleIpthost];

			// Set GET response
			$httpBackend.expectGET('ipthosts').respond(sampleIpthosts);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ipthosts).toEqualData(sampleIpthosts);
		}));

		it('$scope.findOne() should create an array with one Ipthost object fetched from XHR using a ipthostId URL parameter', inject(function(Ipthosts) {
			// Define a sample Ipthost object
			var sampleIpthost = new Ipthosts({
				name: 'New Ipthost'
			});

			// Set the URL parameter
			$stateParams.ipthostId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/ipthosts\/([0-9a-fA-F]{24})$/).respond(sampleIpthost);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ipthost).toEqualData(sampleIpthost);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Ipthosts) {
			// Create a sample Ipthost object
			var sampleIpthostPostData = new Ipthosts({
				name: 'New Ipthost'
			});

			// Create a sample Ipthost response
			var sampleIpthostResponse = new Ipthosts({
				_id: '525cf20451979dea2c000001',
				name: 'New Ipthost'
			});

			// Fixture mock form input values
			scope.name = 'New Ipthost';

			// Set POST response
			$httpBackend.expectPOST('ipthosts', sampleIpthostPostData).respond(sampleIpthostResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Ipthost was created
			expect($location.path()).toBe('/ipthosts/' + sampleIpthostResponse._id);
		}));

		it('$scope.update() should update a valid Ipthost', inject(function(Ipthosts) {
			// Define a sample Ipthost put data
			var sampleIpthostPutData = new Ipthosts({
				_id: '525cf20451979dea2c000001',
				name: 'New Ipthost'
			});

			// Mock Ipthost in scope
			scope.ipthost = sampleIpthostPutData;

			// Set PUT response
			$httpBackend.expectPUT(/ipthosts\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/ipthosts/' + sampleIpthostPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid ipthostId and remove the Ipthost from the scope', inject(function(Ipthosts) {
			// Create new Ipthost object
			var sampleIpthost = new Ipthosts({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Ipthosts array and include the Ipthost
			scope.ipthosts = [sampleIpthost];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/ipthosts\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleIpthost);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.ipthosts.length).toBe(0);
		}));
	});
}());