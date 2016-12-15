'use strict';

angular.module('comments.api', [])
  .factory('Comments', ['$q', '$http', function ($q, $http) {

    var Comments = (function () {
      function Comments(domain) {
        this.domain = domain;
      }

      Comments.prototype.getComments = function (thread_id) {
        var deferred = $q.defer();
        var domain = this.domain;
        var path = 'comment/thread/' + thread_id;

        var url = domain + path;

        var options = {
          method: 'GET',
          url: url
        };

        $http(options).then(function (data) {
            deferred.resolve(data);
          },
          function (data, status, headers, config) {
            deferred.reject({
              status: status,
              headers: headers,
              config: config,
              body: data
            });
          });

        return deferred.promise;
      };



      return Comments;
    })();

    return Comments;
  }]);
