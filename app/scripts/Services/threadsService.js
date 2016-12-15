'use strict';

/**
 * @ngdoc service
 * @name app.threadsService
 * @description
 * # threadsService
 * Service in the app.
 */

angular.module('appApp')
  .factory('threadsService', function ($q, Threads, api) {

    var threads = new Threads(api.domain);

    function getAllThreads(page, orderType) {
      return threads.getAllThreads(page, orderType).then(function (response) {
          return response.data;
        },
        function (error) {
          return $q.reject(error);
        });
    }

    function getThreadsForSub(sub_id, page, orderType) {
      return threads.getThreadsForSub(sub_id, page, orderType).then(function (response) {
          return response.data;
        },
        function (error) {
          return $q.reject(error);
        });
    }

    function getThreadDetail(thread_id) {
      return threads.getThreadDetail(thread_id).then(function (response) {
          return response.data;
        },
        function (error) {
          return $q.reject(error);
        });
    }

    return {
      getAllThreads: getAllThreads,
      getThreadsForSub: getThreadsForSub,
      getThreadDetail: getThreadDetail
    };
  });
