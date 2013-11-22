'use strict';

/* Filters */

angular.module('myApp.filters', [])
  
  .filter('reverse', [function() {
    return function(text) {
      return text.split("").reverse().join("");
    }
  }])
  
  .filter('pre', [function() {
    return function(text) {
      return "<pre>"+text+"<pre>";  //this doesn't work.
    }
  }]);
