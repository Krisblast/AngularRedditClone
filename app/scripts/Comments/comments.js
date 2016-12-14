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
      loading: true,
      showCreate: false
    };

    $scope.newComment = {
      thread_id: $routeParams.thread_id,
      sub_id: $routeParams.id
    };

    function getThread() {
      $http.get('http://laravel-jwt.app/api/thread/' + $routeParams.thread_id + '/detail').success(function (response) {
        $scope.thread = response.data;
        console.log(response);
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

    $scope.createComment = function (newComment, ref) {
      if (ref) {
        newComment.comment_ref_id = ref.id;
        newComment.sub_id = ref.sub_id;
        newComment.thread_id = ref.thread_id;
      }

      $http.post('http://laravel-jwt.app/api/restricted/comment', newComment).success(function (response) {
        console.log(response);
        $scope.comments.push(response.data);

        ref.showCreate = false;
        angular.forEach($scope.comments, function (comment) {
          comment.reply_comments = [];

        });


      }).error(function (error) {
        console.log(error);
      });
    };
  });
