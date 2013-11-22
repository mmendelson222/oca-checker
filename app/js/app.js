'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'myApp.factories',
  'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'ctlLogin'});
  $routeProvider.when('/check', {templateUrl: 'partials/check.html', controller: 'ctlCheckReceipts'});
  $routeProvider.when('/invalid', {templateUrl: 'partials/invalid.html'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/invalid'});
}]);

