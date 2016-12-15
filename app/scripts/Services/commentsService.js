'use strict';

/**
 * @ngdoc service
 * @name app.commentsService
 * @description
 * # commentsService
 * Service in the app.
 */

angular.module('appApp')
  .factory('commentsService', function ($q, Comments, api) {

    var comments = new Comments(api.domain);


    function getComments(thread_id) {
      return comments.getComments(thread_id).then(function (response) {
          return response.data;
        },
        function (error) {
          return $q.reject(error);
        });
    }


    return {
      getComments: getComments
    };
  });
