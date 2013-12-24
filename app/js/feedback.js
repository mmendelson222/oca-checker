'use strict';

/* code related to feedback */
angular.module('myApp.feedbackCode', [])
    .controller('ctlFeedbackModal', ['$scope', '$modalInstance', 'items', function ($scope, $modalInstance, items) {

        $scope.items = items;
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
            alert('ok3');
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
            alert('cancel3');
        };
    }])
;