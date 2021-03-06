'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.loginCode',
  'myApp.feedbackCode',
  'myApp.checkCode',
  'myApp.helpCode',
  'ui.bootstrap',
  'ui.bootstrap.modal',
  'angulartics',
  'angulartics.google.analytics'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/login.html', controller: 'ctlLogin'});
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'ctlLogin'});
  $routeProvider.when('/check', {templateUrl: 'partials/check.html', controller: 'ctlCheckReceipts'});
  $routeProvider.when('/results', {templateUrl: 'partials/results.html', controller: 'ctlCheckReceipts'});
  $routeProvider.when('/print', {templateUrl: 'partials/print.html'});
  $routeProvider.when('/help', {templateUrl: 'partials/help.html'});
  $routeProvider.when('/exit', {templateUrl: 'partials/exit.html', controller: 'ctlExit'});
  $routeProvider.when('/invalid', {templateUrl: 'partials/invalid.html'});
  $routeProvider.otherwise({redirectTo: '/invalid'});
}]);

