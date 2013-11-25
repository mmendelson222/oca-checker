'use strict';

/* Factories */

//returns a service

angular.module('myApp.factories', []).

//for checking the user's login
factory('loginFactory', ['$http', $'userService', function($http, userService) {
	return {
        login: function(user) {
			if (userService.isLogged()) {
				alert("You're already logged in");
				return true;
			}
			
			var $ptin=user['ptin'];
			var $email=user['email'];
			
			if (!$ptin || !$email) {
				alert("You are missing some information.");
				return false;
			}

			//note: this call is asynchronous.
			$http({
				method: 'GET', 
				url: "/svc/login.php?ptin=" + $ptin + "&email=" + $email
			}).
			success(function(data, status, headers, config) {
				userService.token = data['token'];
				userService.ptin = $ptin;
				alert("success");
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
			alert("consulting isloggedin function");
			return userService.isLogged();
		}
    };
}])

//for storing user information
.factory('userService', [function() {
	var sdo = {
		isLogged: function() {
			return sdo.token;
		},
		token: 0,
		ptin: ''
	};
	return sdo;
}]);




  

