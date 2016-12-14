'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:SubsCtrl
 * @description
 * # SubsCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('SubsCtrl', function ($scope, $http, $rootScope) {


    $scope.config = {
      showCreate: false
    };

    $scope.newSub = {};

    $scope.createSub = function (newSub) {
      $http.post('http://laravel-jwt.app/api/restricted/sub', newSub).success(function (response) {
        $scope.subs.push(response.data);
        $scope.config.showCreate = false;
        $scope.newSub = {};
      }).error(function () {
      });
    };

    function getSubs() {
      $http.get('http://laravel-jwt.app/api/sub').success(function (response) {
        $scope.subs = response.data;
        console.log(response);
      }).then(function () {
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

    function getUserSubscriptions() {
      $http.get('http://laravel-jwt.app/api/restricted/subscribe').success(function (response) {
        $rootScope.user.subscriptions = response.data;
      });
    }


    $scope.subscribeToSub = function (sub) {
      $http.post('http://laravel-jwt.app/api/restricted/subscribe', {sub_id: sub.id}).success(function () {
        sub.subscribed = true;
        getUserSubscriptions();
      }).error(function () {
      });
    };

    $scope.unsubscribeToSub = function (sub) {
      $http.delete('http://laravel-jwt.app/api/restricted/subscribe/' + sub.id).success(function (response) {
        console.log(response);
        sub.subscribed = false;
        getUserSubscriptions();
      }).error(function () {
      });
    };

    getSubs();
  });
