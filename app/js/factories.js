'use strict';

/* Factories */

//returns a service

angular.module('myApp.factories', []).

//for checking the user's login
factory('loginFactory', ['$http', 'userService', function(http, userService) {
	return {
        login: function(user) {
			if (userService.isLogged) {
				alert("You're already logged in");
				return true;
			}
			//for testing - log in if both are valid.
            if (user['ptin'] && user['email']) { 
				userService.isLogged = true;
				alert("You're now logged in.");
				return true; 
			}
			
			alert("You are missing some information.");
			return false;
        },

		logout: function() {
			userService.isLogged = false;
		}, 
		
		isloggedin: function() {
			alert("consulting isloggedin function");
			return userService.isLogged;
		}
    };
}])

//for storing user information
.factory('userService', [function() {
	var sdo = {
		isLogged: false,
		ptin: ''
	};
	return sdo;
}])

.factory('logoutService', [function() {
	userService.isLogged = false;
}]);




  

