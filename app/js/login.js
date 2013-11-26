'use strict';

/* code related to login */
angular.module('myApp.loginCode', [])
  .controller('ctlLogin', ['$scope', '$location', 'userService', 'loginFactory', function($scope, $location, userService, lfactory) {
	 
	$scope.ptnPTIN = /^\s*[Pp]\d{8}\s*$/
	
	$scope.userInfo = userService, 
	 
 	$scope.logMeIn = function() { 
		var result = lfactory.login($scope.userInfo); 
	}

	$scope.logMeOut = function() { 
		lfactory.logout(); 
	}
	
	$scope.isLoggedIn =  function () { 
		return lfactory.isloggedin();
	}
	
	if (lfactory.isloggedin()) {
		$location.path("/check");
	}
  }])
  
  //for logout link
  .controller('ctlLoginIndicator', ['$scope', 'loginFactory', function($scope, lfactory) {
	$scope.isLoggedIn =  function () { 
		return lfactory.isloggedin();
	}
  }])
  
//for checking the user's login
.factory('loginFactory', ['$http', '$location', 'userService', function($http, $location, userService) {
	return {
        login: function(user) {
			if (userService.isLogged()) {
				alert("You're already logged in");  //should never get here based on redirect.
				$location.path("/check");
				return;
			}
			
			var $ptin=user['ptin'];
			var $email=user['email'];
			
			if (!$ptin || !$email) {
				alert("You are missing some information.");  //should never get here based on validation
				return;
			}

			//note: this call is asynchronous.
			$http({
				method: 'GET', 
				url: "/svc/login.php?ptin=" + $ptin + "&email=" + $email
			}).
			success(function(data, status, headers, config) {
				if (data['authorized'] == 'true') {
					userService.logMeIn(data['token']);
					userService.ptin = $ptin;
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
			userService.logMeOut();
		}, 
		
		isloggedin: function() {
			return userService.isLogged();
		}
    };
}])
  
//for storing user information
.factory('userService', [function() {
	var oUser = {
		isLogged: function() {
			return oUser.token;
		},
		logMeIn: function(myToken) {
			oUser.token = myToken;
		},
		logMeOut: function(myToken) {
			oUser.token = 0;
			oUser.ptin = '';
			oUser.email = ''
		},
		token: 0,
		ptin: '',
		email: ''
	};
	return oUser;
}]);