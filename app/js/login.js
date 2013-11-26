'use strict';

/* code related to login */
angular.module('myApp.loginCode', [])
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
  
//for checking the user's login
.factory('loginFactory', ['$http', '$location', 'userService', function($http, $location, userService) {
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