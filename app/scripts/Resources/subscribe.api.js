'use strict';

angular.module('subscribe.api', [])
  .factory('Subscribe', ['$q', '$http', function ($q, $http) {

    var Subscribe = (function () {
      function Subscribe(domain) {
        this.domain = domain;
      }

      Subscribe.prototype.subscribeToSub = function (sub_id) {
        var deferred = $q.defer();
        var domain = this.domain;
        var path = 'restricted/subscribe';
        var url = domain + path;
        var options = {
          method: 'POST',
          url: url,
          data: {sub_id: sub_id}
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



      Subscribe.prototype.unsubscribeToSub = function (sub_id) {
        var deferred = $q.defer();
        var domain = this.domain;
        var path = 'restricted/subscribe/' + sub_id;
        var url = domain + path;
        var options = {
          method: 'DELETE',
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

      return Subscribe;
    })();

    return Subscribe;
  }]);
