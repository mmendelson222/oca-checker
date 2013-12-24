'use strict';

angular.module('myApp.helpCode', [])
    .controller('ctlHelp', ['$scope', '$modal', function($scope, $modal){
        $scope.helpLogin = function () {
            $modal.open({
                templateUrl: 'partials/modal/helpLogin.html',
                controller: 'ctlModal'
            });
        };
        $scope.helpCheck = function () {
            $modal.open({
                templateUrl: 'partials/modal/helpCheck.html',
                controller: 'ctlModal'
            });
        };
        $scope.helpCompare = function () {
            $modal.open({
                templateUrl: 'partials/modal/helpCompare.html',
                controller: 'ctlModal'
            });
        };
    }])

    .controller('ctlModal', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
        $scope.ok = function () {
            $modalInstance.close();
        };

    }])
;


