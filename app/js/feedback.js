'use strict';

/* code related to feedback */
angular.module('myApp.feedbackCode', [])
    .controller('ctlFeedbackModal', ['$scope', '$modalInstance', 'feedbackService', 'feedbackFactory', function ($scope, $modalInstance, feedbackService, feedbackFactory) {

        $scope.feedback = feedbackService;

        $scope.ok = function () {
            $modalInstance.close();
            feedbackFactory.sendFeedback($scope.feedback);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }])


//for checking the user's login
    .factory('feedbackFactory', ['$http', '$location', '$analytics', function($http, $location, $analytics) {
        return {
            sendFeedback: function(feedback) {

                //note: this call is asynchronous.
                $http.post("/service/feedback", feedback).
                    success(function(data, status, headers, config) {
                        alert("feedback sent")
                        $analytics.eventTrack('feedback', {  category: 'feedback', label: 'feedback' });
                    }).
                    error(function(data, status, headers, config) {
                        alert("Web service connection error: "+status);
                    })
            }
        };
    }])

//for storing feedback
    .service('feedbackService', [function() {
        text: ''
    }])
;