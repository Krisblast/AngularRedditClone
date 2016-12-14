'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('RegisterCtrl', function ($scope, $http) {

    $scope.newUser={};

    $scope.createUser = function (newUser) {
      $http.post('http://laravel-jwt.app/api/register', newUser).success(function () {
        $scope.newUser={};
      }).error(function (error) {
        $scope.errors = error.errors;
      });
    };
  });
