'use strict';

/* code related to login */
angular.module('myApp.loginCode', [])
    .controller('ctlExit', ['$scope', 'userService', function($scope, userService){
        userService.logMeOut();
    }])

  .controller('ctlLogin', ['$scope', '$location', 'userService', 'loginFactory', function($scope, $location, userService, lfactory) {

	$scope.ptnPTIN = /^\s*[Pp]\d{8}\s*$/

	$scope.userInfo = userService;
	 
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
  
  //for logout and exit links
  .controller('ctlLoginIndicator', ['$scope', '$modal', 'loginFactory', function($scope, $modal, lfactory) {
	$scope.isLoggedIn =  function () {
		return lfactory.isloggedin();
	};

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.exitPrompt = function () {

        var modalInstance = $modal.open({
            templateUrl: 'partials/modal/exitFeedback.html',
            controller: 'ctlFeedbackModal',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
 }])

.controller('ctlFeedbackModal', ['$scope', '$modalInstance', 'items', function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
        alert('ok2');
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
        alert('cancel2');
    };
}])


//for checking the user's login
.factory('loginFactory', ['$http', '$location', '$analytics', 'userService', function($http, $location, $analytics, userService) {
	return {
        login: function(user) {
			if (userService.isLogged()) {
				$location.path("/check");
				return;
			}

			//note: this call is asynchronous.
			$http.post("/service/authenticate", user).
			success(function(data, status, headers, config) {
				if (data['authenticated'] == true) {
                    user.error = null;
					userService.logMeIn();
                    $analytics.eventTrack('signin', {  category: 'login', label: 'success' });
					$location.path("/check");
				} else {
                    $analytics.eventTrack('signin', {  category: 'login', label: 'failure' });
                    user.error = "Login unsuccessful. Please verify your information below and try again.";
				}
			}).
			error(function(data, status, headers, config) {
                user.error = "Web service connection error: "+status;
			})
        },

		logout: function() {
            $analytics.eventTrack('signin', {  category: 'logout', label: 'success' });
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
            oUser.code = '';
            oUser.acknowledge = false;
            $cookieStore.remove("authenticated");
		},
		authenticated:  $cookieStore.get("authenticated"),
		ptin: '',
        code: ''
	};
	return oUser;
}]);