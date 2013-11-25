'use strict';

/* Controllers */
angular.module('myApp.controllers', [])
  .controller('ctlLogin', ['$scope', 'loginFactory', function($scope, lfactory) {
	 
	$scope.ptnPTIN = /^\s*[Pp]\d{8}\s*$/
	 
	//$scope.ptnWord = /^\s*\w*\s*$/
	
	$scope.userInfo = {
         ptin: "",
         email: "",
     }
	 
 	$scope.logMeIn = function() { 
		var result = lfactory.login($scope.userInfo); 
	}

	$scope.logMeOut = function() { 
		var result = lfactory.logout(); 
	}
	
	$scope.isLoggedIn = function() { 
		return lfactory.loggedin(); 
	}

  }])
  
  .controller('ctlCheckReceipts', ['$scope', function($scope) {

		$scope.ptnMcc = /^\s*\d{4}\s*$/
		$scope.ptnZip = /^\s*\d{5}\s*$/
  
		//probably not needed.
		$scope.checkInfo = {
			 mcc: "",
			 zip: "",
			 receiptsCard: "",
			 receiptsTotal: "",
			 transactionCount: ""
		 }
	 
	$scope.submitRequest = function() { 
		alert("hoook me up!");
	}
  }])
  ;