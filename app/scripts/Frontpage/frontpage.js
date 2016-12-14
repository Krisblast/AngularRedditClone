'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:AllCtrl
 * @description
 * # AllCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('FrontpageCtrl', function ($scope, $http, $rootScope) {

    $rootScope.activePage = 'sub/frontpage';
    $scope.config = {
      orderType: 'hot'
    };

    $scope.nextPage = 1;
    $scope.subscribedThreads = [];

    $scope.getSubscribedThreads = function (page) {
      $http.get('http://laravel-jwt.app/api/restricted/sub/subscribed?page=' + page).success(function (response) {
        $scope.nextPage += 1;
        $scope.subscribedThreads = $scope.subscribedThreads.concat(response.data.data);
      });
    };


    $scope.getSubscribedThreads($scope.nextPage);



  });
