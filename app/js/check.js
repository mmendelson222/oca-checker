'use strict';

/* code related to merchant income check */
angular.module('myApp.checkCode', [])
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
						alert(data['result']);
						status = data['result'];
					} else {
						alert(data['error']);
						status = data['error'];
					}
				} else {
					//indicates an error.
					alert(data);
					status = data;
				}
			}).
			error(function(data, status, headers, config) {
				alert("error when connecting to the web service: "+status);
			})
        }, 
		status: ""
    };
}]);