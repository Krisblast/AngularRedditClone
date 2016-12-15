'use strict';

angular.module('threads.api', [])
  .factory('Threads', ['$q', '$http', function ($q, $http) {

    var Threads = (function () {
      function Threads(domain) {
        this.domain = domain;
      }

      Threads.prototype.getAllThreads = function (page, orderType) {
        var deferred = $q.defer();
        var domain = this.domain;
        var path = 'thread';

        var url = domain + path;

        var options = {
          method: 'GET',
          url: url,
          params: {
            page:page,
            orderType:orderType
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

      Threads.prototype.getThreadsForSub = function (sub_id, page, orderType) {
        var deferred = $q.defer();
        var domain = this.domain;
        var path = 'thread/' + sub_id;

        var url = domain + path;

        var options = {
          method: 'GET',
          url: url,
          params: {
            page:page,
            orderType:orderType
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

      Threads.prototype.getThreadDetail = function (thread_id) {
        var deferred = $q.defer();
        var domain = this.domain;
        var path = 'thread/' + thread_id + '/detail';

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



      return Threads;
    })();

    return Threads;
  }]);
