'use strict';

/* Controllers */
angular.module('myApp.controllers', [])
  .controller('ctlLogin', ['$scope', 'loginFactory', function($scope, lfactory) {
	 
	$scope.ptnPTIN = /^\s*\d*\s*$/
	 
	//$scope.ptnWord = /^\s*\w*\s*$/
	
	$scope.userInfo = {
         ptin: "myptin",
         email: "myemail",
		 password: ""
     }
	 
 	$scope.logMeIn = function() { 
		var result = lfactory.login($scope.userInfo); 
		alert(result);
	}

  }])
  
  .controller('MyCtrl2', [function() {

  }]);