'use strict';

/**
 * @ngdoc service
 * @name app.usersService
 * @description
 * # usersService
 * Service in the app.
 */

angular.module('appApp')
  .factory('usersService', function ($q, Users, api) {

    var users = new Users(api.domain);

    function getPublicUser(id) {
      return users.getPublicUser(id).then(function (response) {
          return response.data;
        },
        function (error) {
          return $q.reject(error);
        });
    }

    function getUserThreads(user_id, threadPageNumber) {
      return users.getUserThreads(user_id, threadPageNumber).then(function (response) {
          return response.data;
        },
        function (error) {
          return $q.reject(error);
        });
    }


    return {
      getPublicUser: getPublicUser,
      getUserThreads:getUserThreads
    };
  });
