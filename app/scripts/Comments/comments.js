'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:CommentsCtrl
 * @description
 * # CommentsCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('CommentsCtrl', function ($scope, $routeParams, threadsService, commentsService) {
    $scope.config = {
      loading: true
    };

    function getThread(thread_id) {
      threadsService.getThreadDetail(thread_id).then(function (response) {
        $scope.thread = response.data;
        $scope.config.loading = false;
      });
    }


    function getComments(thread_id) {
      commentsService.getComments(thread_id).then(function (response) {
        $scope.comments = response.data;
        $scope.config.loading = false;
      });
    }


    getThread($routeParams.thread_id);
    getComments($routeParams.thread_id);

  });
