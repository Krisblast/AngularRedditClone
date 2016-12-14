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
      $http.post('http://laravel-jwt.app/api/register', newUser).success(function (response) {
        $scope.newUser={};



      }).error(function (error) {
        console.log(error)
        $scope.errors = error.errors;
      });
    };
  });
