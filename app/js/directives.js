'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('app-version', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
