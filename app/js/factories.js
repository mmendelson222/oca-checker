'use strict';

/* Factories */

//returns a service

angular.module('myApp.factories', []).

//for checking the user's login
factory('loginFactory', ['$http', '$location', 'userService', function($http, $location, userService) {
	return {
        login: function(user) {
			if (userService.isLogged()) {
				alert("You're already logged in");
				$location.path("/check");
				return;
			}
			
			var $ptin=user['ptin'];
			var $email=user['email'];
			
			if (!$ptin || !$email) {
				alert("You are missing some information.");
				return;
			}

			//note: this call is asynchronous.
			$http({
				method: 'GET', 
				url: "/svc/login.php?ptin=" + $ptin + "&email=" + $email
			}).
			success(function(data, status, headers, config) {
				if (data['authorized']) {
					userService.token = data['token'];
					userService.ptin = $ptin;
					alert("authorized");
					$location.path("/check");
				} else {
					alert("not authorized");
				}
			}).
			error(function(data, status, headers, config) {
				alert("error when connecting to the web service: "+status);
			})
        },

		logout: function() {
			userService.token = 0;
			userService.ptin = '';
		}, 
		
		isloggedin: function() {
			console.log("consulting isloggedin function");
			return userService.isLogged();
		}
    };
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
				if (Array.isArray(data)) {
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
}])

//for storing user information
.factory('userService', [function() {
	var oUser = {
		isLogged: function() {
			return oUser.token;
		},
		token: 0,
		ptin: ''
	};
	return oUser;
}]);



  

