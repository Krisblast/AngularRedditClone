'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:CommentsCtrl
 * @description
 * # CommentsCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('CommentsCtrl', function ($http, $scope, $routeParams) {
    $scope.config = {
      loading: true
    };

    function getThread() {
      $http.get('http://laravel-jwt.app/api/thread/' + $routeParams.thread_id + '/detail').success(function (response) {
        $scope.thread = response.data;
        $scope.config.loading = false;
      });
    }

    getThread();

    function getComments() {
      $http.get('http://laravel-jwt.app/api/comment/thread/' + $routeParams.thread_id).success(function (response) {
        $scope.comments = response.data;
        $scope.config.loading = false;
      });
    }

    getComments();
  });
