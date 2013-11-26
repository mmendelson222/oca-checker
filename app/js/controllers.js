'use strict';

/* Controllers */
angular.module('myApp.controllers', [])
  .controller('ctlLogin', ['$scope', 'loginFactory', function($scope, lfactory) {
	 console.log("login controller"); 
	 
	$scope.ptnPTIN = /^\s*[Pp]\d{8}\s*$/
	
	$scope.userInfo = {
         ptin: "",
         email: "",
     }
	 
 	$scope.logMeIn = function() { 
		var result = lfactory.login($scope.userInfo); 
	}

	$scope.logMeOut = function() { 
		lfactory.logout(); 
	}
	
	$scope.isLoggedIn =  function () { 
		return lfactory.isloggedin();
	}
  }])
  
  .controller('ctlCheckReceipts', ['$scope', 'checkFactory', function($scope, cFactory) {

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
		cFactory.check($scope.checkInfo);
	}
  }]);