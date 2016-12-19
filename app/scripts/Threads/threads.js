'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:SubsCtrl
 * @description
 * # SubsCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('ThreadsCtrl', function ($scope, $http, $routeParams, $rootScope, threadsService) {

    $scope.sub = {};
    $scope.subThreads = [];
    $scope.ready = false;

    $scope.config = {
      showCreate: false,
      loading: false,
      createType: 'link',
      orderType: 'hot'
    };

    function getSub(id) {
      $http.get('http://laravel-jwt.app/api/sub/' + id).success(function (response) {
        $scope.sub = response.data;
        console.log(response);
        $rootScope.activePage = 'sub/' + response.data.id;
        $scope.ready = true;
      });
    }

    getSub($routeParams.id);


  });

