angular.module('appApp')
  .component('commentsTreeComponent', {
    templateUrl: 'components/commentsTreeComponent/template.html',
    controller: function($http, $routeParams){
      var $ctrl = this;

      this.newComment = {
        thread_id: $routeParams.thread_id,
        sub_id: $routeParams.id
      };

      this.config = {
        loading: true,
        showCreate: false
      };

      angular.forEach($ctrl.comments, function (comment) {
        comment.reply_comments = [];
        getReplyComments(comment)
      });

      function getReplyComments(comment) {
        angular.forEach($ctrl.comments, function (commentToCheck) {
          if (comment.id === commentToCheck.comment_ref_id) {
            comment.reply_comments.push(commentToCheck);
          }
        })
      }


      this.createComment = function (newComment, ref) {
        if (ref) {
          newComment.comment_ref_id = ref.id;
          newComment.sub_id = ref.sub_id;
          newComment.thread_id = ref.thread_id;
        }

        $http.post('http://laravel-jwt.app/api/restricted/comment', newComment).success(function (response) {
          console.log(response);
          $ctrl.comments.push(response.data);

          if(ref){
            ref.showCreate = false;
          }

          angular.forEach($ctrl.comments, function (comment) {
            comment.reply_comments = [];
            getReplyComments(comment)
          });


        }).error(function (error) {
          console.log(error);
        })
      }


    },
    bindings: {
      comments: '='
    }
  });
