angular.module('appApp')

  .component('votePanel', {
    templateUrl: 'components/votePanelComponent/template.html',
    controller: function ($http) {

      var $ctrl = this;
      $ctrl.locked = false;

      this.upVote = function (thread) {
        if($ctrl.locked === false){
          $ctrl.locked = true;
          var data = {
            thread_id: thread.id
          };
          $http.post('http://laravel-jwt.app/api/restricted/vote/up', data).success(function (response) {
            $ctrl.locked = false;
            if (thread.vote_type === 0) {
              thread.total_votes += 2;
            }
            if (thread.vote_type === 1) {

            }
            if (thread.vote_type === null || thread.vote_type === undefined) {
              thread.total_votes += 1;
            }
            thread.vote_type = 1;
          }).error(function (error) {
            $ctrl.locked = false;
          });
        }
      };


      this.downVote = function (thread) {
        if($ctrl.locked === false){
          $ctrl.locked = true;
          var data = {
            thread_id: thread.id
          };
          $http.post('http://laravel-jwt.app/api/restricted/vote/down', data).success(function (response) {
            $ctrl.locked = false;

            if (thread.vote_type === 0) {
            }
            if (thread.vote_type === 1) {
              thread.total_votes -= 2;

            }
            if (thread.vote_type === null || thread.vote_type === undefined) {
              thread.total_votes -= 1;
            }
            thread.vote_type = 0;
          }).error(function (error) {
            $ctrl.locked = false;
          });
        }
      };

    },
    bindings: {
      thread: '='
    }
  });
