'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:SubsCtrl
 * @description
 * # SubsCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('SubsCtrl', function ($scope, $http, $rootScope, subscribeService, subsService) {


    $scope.config = {
      showCreate: false
    };

    $scope.newSub = {};

    $scope.createSub = function (newSub) {
      subsService.createSub(newSub).then(function (response) {
        $scope.subs.push(response.data);
        $scope.config.showCreate = false;
        $scope.newSub = {};
      });
    };

    function getSubs() {
      subsService.getSubs().then(function (response) {
        $scope.subs = response.data;

        //FIXME plz
        $http.get('http://laravel-jwt.app/api/restricted/subscribe').success(function (response) {
          console.log(response);
          $rootScope.user.subscriptions = response.data;
        }).then(function () {
          angular.forEach($scope.subs, function (sub) {
            sub.subscribed = false;
            angular.forEach($rootScope.user.subscriptions, function (subscription) {
              if (sub.id === subscription.sub_id) {
                sub.subscribed = true;
              }
            });
          });
        });
      });
    }


    getSubs();
  });
