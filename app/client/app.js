"use strict"

angular.module('ipTracker', ['ngRoute', 'ipTracker.mainCtrl', 'ipTracker.loginCtrl', 'ipTracker.signupCtrl'])
 
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'MainCtrl',
      templateUrl:'main/main.html'
    })
    .when('/login', {
      controller:'LoginCtrl',
      templateUrl:'login/login.html'
    })
    .when('/signup', {
      controller:'SignupCtrl',
      templateUrl:'signup/signup.html'
    })
    .otherwise({
      redirectTo:'/'
    });
});