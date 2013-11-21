'use strict';

/* Factories */

//returns a service

angular.module('myApp.factories', []).
factory('loginFactory', ['$http', function(http) {
	return {
        login: function(user) {
            if (user['password'] == '123') 
				return "ok"; 
			else
				return "no";
        }
    };
}]);



  

