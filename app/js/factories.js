'use strict';

/* Factories */

//returns a service

angular.module('myApp.factories', []).

//for checking the user's login
factory('loginFactory', ['$http', function(http) {
	return {
        login: function(user) {
			//return ok if both are valid.
            if (user['ptin'] && user['email']) 
				return "ok"; 
			else
				return "no";
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
}]);




  

