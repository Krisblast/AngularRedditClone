'use strict';

angular.module('subs.api', [])
  .factory('Subs', ['$q', '$http', function ($q, $http) {

    var Subs = (function () {
      function Subs(domain) {
        this.domain = domain;
      }

      Subs.prototype.createSub = function (newSub) {
        var deferred = $q.defer();
        var domain = this.domain;
        var path = 'restricted/sub';

        var url = domain + path;

        var options = {
          method: 'POST',
          url: url,
          data: newSub
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




      Subs.prototype.getSubs = function () {
        var deferred = $q.defer();
        var domain = this.domain;
        var path = 'sub';

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


      return Subs;
    })();

    return Subs;
  }]);
