'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:SubsCtrl
 * @description
 * # SubsCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('ThreadsCtrl', function ($scope, $http, $routeParams, $rootScope, threadsService) {


    $scope.nextPage = 1;

    $scope.config = {
      showCreate: false,
      loading: true,
      createType: 'link',
      orderType: 'hot'
    };

    $scope.sub = {};


    function getSub(id) {
      $http.get('http://laravel-jwt.app/api/sub/' + id).success(function (response) {
        $scope.sub = response.data;
        console.log(response);
        $scope.getThreads(1, 'hot');
        $rootScope.activePage = 'sub/' + response.data.id;
        $scope.newThread = {
          sub_id: $scope.sub.id
        };
      });
    }

    getSub($routeParams.id);

    $scope.subThreads = [];

    $scope.getThreads = function (page, orderType, resetData) {
      $scope.nextPage += 1;
      threadsService.getThreadsForSub($scope.sub.id,page, orderType).then(function (response) {
        $scope.config.orderType = orderType;
        $scope.config.last_page = response.data.last_page;
        if (resetData) {
          $scope.subThreads = [];
          $scope.nextPage = 1;
        }
        $scope.subThreads = $scope.subThreads.concat(response.data.data);
        console.log(response);
        $scope.config.loading = false;

      });
    };
  })
  
  .directive("fileread", [function () {
    return {
      scope: {
        fileread: "="
      },
      link: function (scope, element) {
        element.bind("change", function (changeEvent) {
          var reader = new FileReader();
          reader.onload = function (loadEvent) {
            scope.$apply(function () {
              scope.fileread = loadEvent.target.result;
            });
          };
          reader.readAsDataURL(changeEvent.target.files[0]);
        });
      }
    };
  }])
  .filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
    };
  });
