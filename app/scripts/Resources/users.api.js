'use strict';

angular.module('users.api', [])
  .factory('Users', ['$q', '$http', function ($q, $http) {

    var Users = (function () {
      function Users(domain) {
        this.domain = domain;
      }

      Users.prototype.getPublicUser = function (id) {
        var deferred = $q.defer();
        var domain = this.domain;
        var path = 'user/public/' + id;

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



      Users.prototype.getUserThreads = function (user_id, threadPageNumber) {
        var deferred = $q.defer();
        var domain = this.domain;
        var path = 'user/public/'+user_id+'/threads';

        var url = domain + path;

        var options = {
          method: 'GET',
          url: url,
          params: {
            page: threadPageNumber
          }
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

      return Users;
    })();

    return Users;
  }]);
