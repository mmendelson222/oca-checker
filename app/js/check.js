'use strict';

/* code related to merchant income check */
angular.module('myApp.checkCode', [])
  .controller('ctlCheckReceipts', ['$scope', '$location', 'requestService', 'checkFactory', 'loginFactory', '$anchorScroll', function($scope, $location, requestService, cFactory, lfactory, $anchorScroll) {

	$scope.ptnMcc = /^\s*\d{3}\s*$/
	$scope.ptnZip = /^\s*\d{5}\s*$/
    $scope.ptnDollars = /^\s*\d+\.?\d?\d?\s*$/
    $scope.ptnNumber = /^\s*\d+\s*$/

	$scope.checkInfo = requestService;

    // scroll to top.
    $location.hash('top');
    $anchorScroll();

	$scope.submitRequest = function() { 
		cFactory.check($scope.checkInfo);
	}

    $scope.goToLogin = function() {
        $scope.checkInfo.status = null;
        $location.path("/login");
    }

    if ($scope.checkInfo.status == 'notloggedin'){
        //returned with status
    } else	if (!lfactory.isloggedin()) {
        $location.path("/login");
	}
  }])
  
  //for submitting the request.
.factory('checkFactory', ['$http', '$location', 'userService', function($http, $location, userService) {
	return {
        check: function(checkInfo) {

			//note: this call is asynchronous.
			$http.post("/service/calculate", checkInfo).
        	success(function(data, httpstatus, headers, config) {
				if (headers('content-type') === "application/json") {
                    checkInfo.status = data['status'];
                    switch(checkInfo.status) {
                        case 'low':
                        case 'typical':
                            $location.path("/results");
                            break;
                        case 'notloggedin':
                            userService.logMeOut();
                            break;
                        default:
                            checkInfo.status = "error";
                            checkInfo.errorMessage = data['errorMessage'];
                    }
				} else {
					//indicates an error.
					checkInfo.status = "error";
                    checkInfo.errorMessage = "Web service failure: " + data;
				}
			}).
			error(function(data, status, headers, config) {
                    checkInfo.status = "error";
                    checkInfo.errorMessage = "Web service connection error:  "+status;
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