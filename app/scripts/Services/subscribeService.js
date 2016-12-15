'use strict';

/**
 * @ngdoc service
 * @name app.subscribeService
 * @description
 * # subscribeService
 * Service in the app.
 */

angular.module('appApp')
  .factory('subscribeService', function ($q, Subscribe, api) {

    var subscribe = new Subscribe(api.domain);

    function subscribeToSub(sub_id) {
      return subscribe.subscribeToSub(sub_id).then(function (response) {
          return response.data;
        },
        function (error) {
          return $q.reject(error);
        });
    }

    function unsubscribeToSub(sub_id) {
      return subscribe.unsubscribeToSub(sub_id).then(function (response) {
          return response.data;
        },
        function (error) {
          return $q.reject(error);
        });
    }


    return {
      subscribeToSub: subscribeToSub,
      unsubscribeToSub:unsubscribeToSub
    };
  });
