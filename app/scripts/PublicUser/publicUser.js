'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:PublicUserCtrl
 * @description
 * # PublicUserCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('PublicUserCtrl', function ($scope, $http, $routeParams) {

    $scope.publicUser = {
      comments: []
    };

    $scope.publicUserThreads = [];

    function getUser(user_id){
      $http.get('http://laravel-jwt.app/api/user/public/'+user_id).success(function (response) {
        $scope.publicUser.data = response.data;
        getUserComments(response.data.id);
        $scope.getUserThreads(response.data.id, 1)
      })
    }

    function getUserComments(user_id){
      $http.get('http://laravel-jwt.app/api/comment/user/'+user_id).success(function (response) {
        $scope.publicUser.comments = response.data;
      })
    }

    $scope.threadPageNumber = 1;

    $scope.getUserThreads = function(user_id, threadPageNumber){
      $scope.threadPageNumber += 1;
      $http.get('http://laravel-jwt.app/api/user/public/'+user_id+'/threads?page=' + threadPageNumber).success(function (response) {
        $scope.publicUserThreads = $scope.publicUserThreads.concat(response.data.data);
      })
    };

    getUser($routeParams.user_id);
  });
