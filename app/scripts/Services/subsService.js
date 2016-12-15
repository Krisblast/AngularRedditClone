'use strict';

/**
 * @ngdoc service
 * @name app.subsService
 * @description
 * # subsService
 * Service in the app.
 */

angular.module('appApp')
  .factory('subsService', function ($q, Subs, api) {

    var subs = new Subs(api.domain);

    function createSub(newSub) {
      return subs.createSub(newSub).then(function (response) {
          return response.data;
        },
        function (error) {
          return $q.reject(error);
        });
    }

    function getSubs() {
      return subs.getSubs().then(function (response) {
          return response.data;
        },
        function (error) {
          return $q.reject(error);
        });
    }

    return {
      createSub: createSub,
      getSubs:getSubs
    };
  });
