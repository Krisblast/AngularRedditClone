'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('RegisterCtrl', function ($scope, authService) {

    $scope.newUser={};

    $scope.createUser = function (newUser) {
      authService.createUser(newUser).then(function () {
        $scope.newUser={};

      }).then(function (error) {
        $scope.errors = error.errors;
      });
    };

  });
