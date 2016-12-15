angular.module('appApp')
  .component('voteCommentPanel', {
    templateUrl: 'components/voteCommentComponent/template.html',
    controller: function($scope,$http){


      //TODO Move Vote to stuff directive?
      this.upVote = function (comment) {
        var data = {
          comment_id: comment.id
        };
        $http.post('http://laravel-jwt.app/api/restricted/vote/up', data).success(function () {
          if(comment.vote_type === 0){
            comment.total_votes += 2;
          }
          if(comment.vote_type === 1){
          }
          if(comment.vote_type === null){
            comment.total_votes += 1;
          }

          comment.vote_type = 1;

        }).error(function (error) {

        });
      };

      this.downVote = function (comment) {
        var data = {
          comment_id: comment.id
        };
        $http.post('http://laravel-jwt.app/api/restricted/vote/down', data).success(function () {
          if(comment.vote_type === 0){

          }
          if(comment.vote_type === 1){
            comment.total_votes -= 2;

          }
          if(comment.vote_type === null){
            comment.total_votes -= 1;
          }
          comment.vote_type = 0;
        }).error(function (error) {
        });
      };

    },
    bindings: {
      comment: '<'
    }
  });
