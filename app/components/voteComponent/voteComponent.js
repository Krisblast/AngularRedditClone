angular.module('appApp')

  .component('votePanel', {
    templateUrl: 'components/voteComponent/template.html',
    controller: function($http){

      this.upVote = function (thread) {

        console.log(thread)


        var data = {
          thread_id: thread.id
        };
        $http.post('http://laravel-jwt.app/api/restricted/vote/up', data).success(function (response) {

          console.log(thread)

          if(thread.vote_type === 0){
            thread.total_votes += 2;
          }
          if(thread.vote_type === 1){

          }
          if(thread.vote_type === null || thread.vote_type === undefined){
              thread.total_votes += 1;
          }

          thread.vote_type = 1;

        }).error(function (error) {
        });
      };


      this.downVote = function (thread) {
        var data = {
          thread_id: thread.id
        };
        $http.post('http://laravel-jwt.app/api/restricted/vote/down', data).success(function (response) {

          if(thread.vote_type === 0){
          }
          if(thread.vote_type === 1){
            thread.total_votes -= 2;

          }
          if(thread.vote_type === null || thread.vote_type === undefined){
              thread.total_votes -= 1;
          }


          thread.vote_type = 0;
        }).error(function (error) {
        });
      };



    },
    bindings: {
      thread: '='
    }
  });
