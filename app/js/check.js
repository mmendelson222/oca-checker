'use strict';

/* code related to merchant income check */
angular.module('myApp.checkCode', [])
  .controller('ctlCheckReceipts', ['$scope', '$location', 'requestService', 'checkFactory', 'loginFactory', function($scope, $location, requestService, cFactory, lfactory) {

	$scope.ptnMcc = /^\s*\d{4}\s*$/
	$scope.ptnZip = /^\s*\d{5}\s*$/

	$scope.checkInfo = requestService,
	 
	$scope.submitRequest = function() { 
		cFactory.check($scope.checkInfo);
	}
	
	if (!lfactory.isloggedin()) {
		$location.path("/login");
	}
  }])
  
  //for submitting the request.
.factory('checkFactory', ['$http', '$location', 'userService', function($http, $location, userService) {
	return {
        check: function(checkInfo) {

			//note: this call is asynchronous.
			$http({
				method: 'GET', 
				url: "/svc/check.php?token=" + userService['token'] + 
					"&mcc=" + checkInfo['mcc'] +
					"&receiptsCard=" + checkInfo['receiptsCard'] +
					"&receiptsTotal=" +  checkInfo['receiptsTotal'] +
					"&transactionCount=" + checkInfo['transactionCount']
			}).
			success(function(data, status, headers, config) {
				if (headers('content-type') === "application/json") {
					if (data['valid'] == 'true') {
						checkInfo.status = data['result'];
					} else {
						checkInfo.status = data['error'];
					}
				} else {
					//indicates an error.
					checkInfo.status = "Web service failure: " + data;
				}
				
				$location.path("/results");
			}).
			error(function(data, status, headers, config) {
				alert("Web service connection error:  "+status);
			})
        }
    };
}])
//for storing user information
.factory('requestService', [function() {
	var oRequest = {
			 mcc: "",
			 zip: "",
			 receiptsCard: "",
			 receiptsTotal: "",
			 transactionCount: "",
			 status: ""
		};
	return oRequest;
}])
;