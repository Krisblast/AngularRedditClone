'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:AllCtrl
 * @description
 * # AllCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('AllCtrl', function ($scope, $http, $rootScope, $location) {

    $rootScope.activePage = 'sub/all';
    $scope.subscribedThreads = [];

    $scope.config = {
      orderType: 'hot'
    };

    $scope.getAllThreads = function (page, orderType, resetData, setPage) {

      if (setPage) {
        $scope.nextPage += 1;
        $location.search('page', page);
      }

      $http.get('http://laravel-jwt.app/api/thread?page=' + page + '&order=' + orderType).success(function (response) {
        $scope.config.orderType = orderType;
        $scope.config.last_page = response.data.last_page;
        if (resetData) {
          $scope.subscribedThreads = [];
          $scope.nextPage = 1;
        }
        $scope.subscribedThreads = $scope.subscribedThreads.concat(response.data.data);
      });
    };


    if ($location.search().page) {
      $scope.nextPage = parseInt($location.search().page);
      $scope.nextPage += 1;
      $scope.getAllThreads(1, $scope.config.orderType, false, false);
      for (var i = 1; i < $location.search().page; i++) {
          $scope.getAllThreads(i+1, $scope.config.orderType, false, false);
      }
    }

    else {
      $scope.nextPage = 1;
      $scope.getAllThreads($scope.nextPage, $scope.config.orderType, false, true);
    }

  });
