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

			//note: this call is asynchronous.
			$http.post("/service/authenticate", user).
			success(function(data, status, headers, config) {
				if (data['authenticated'] == true) {
					userService.logMeIn();
					$location.path("/check");
				} else {
					alert("not authenticated");
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
.factory('userService', ['$cookieStore', function($cookieStore) {
	var oUser = {
		isLogged: function() {
			return oUser.authenticated;
		},
		logMeIn: function() {
			oUser.authenticated=true;
            $cookieStore.put("authenticated", true);
		},
		logMeOut: function() {
            oUser.authenticated=false;
			oUser.ptin = '';
			oUser.email = '';
            oUser.code = '';
            $cookieStore.remove("authenticated");
		},
		authenticated:  $cookieStore.get("authenticated"),
		ptin: '',
		email: '',
        code: ''
	};
	return oUser;
}]);