'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:SubsCtrl
 * @description
 * # SubsCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('ThreadsCtrl', function ($scope, $http, $routeParams, $rootScope) {


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

      })
    }

    getSub($routeParams.id);

    $scope.subThreads = [];

    $scope.getThreads = function (page, orderType, resetData) {
      $scope.nextPage += 1;
      $http.get('http://laravel-jwt.app/api/thread/' + $scope.sub.id + '?page=' + page + '&order=' + orderType).success(function (response) {
        $scope.config.orderType = orderType;
        $scope.config.last_page = response.data.last_page;
        if (resetData) {
          $scope.subThreads = [];
          $scope.nextPage = 1;

        }
        $scope.subThreads = $scope.subThreads.concat(response.data.data);
        console.log(response);
        $scope.config.loading = false;
      })
    };


    $scope.postThread = function (newThread) {
      $http.post('http://laravel-jwt.app/api/restricted/thread', newThread).success(function (response) {
        $scope.subThreads.push(response.data);
        $scope.config.showCreate = false;

        $scope.newThread = {
          sub_id: $scope.sub.id
        };

        console.log(response);
      })
    };




  })
  .directive("fileread", [function () {
    return {
      scope: {
        fileread: "="
      },
      link: function (scope, element, attributes) {
        element.bind("change", function (changeEvent) {
          var reader = new FileReader();
          reader.onload = function (loadEvent) {
            scope.$apply(function () {
              scope.fileread = loadEvent.target.result;
            });
          }
          reader.readAsDataURL(changeEvent.target.files[0]);
        });
      }
    }
  }])
  .directive('appFilereader', function ($q) {
    var slice = Array.prototype.slice;

    return {
      restrict: 'A',
      require: '?ngModel',
      link: function (scope, element, attrs, ngModel) {
        if (!ngModel) return;

        ngModel.$render = function () {
        };

        element.bind('change', function (e) {
          var element = e.target;

          $q.all(slice.call(element.files, 0).map(readFile))
            .then(function (values) {
              if (element.multiple) ngModel.$setViewValue(values);
              else ngModel.$setViewValue(values.length ? values[0] : null);
            });

          function readFile(file) {
            var deferred = $q.defer();

            var reader = new FileReader();
            reader.onload = function (e) {
              deferred.resolve(e.target.result);
            };
            reader.onerror = function (e) {
              deferred.reject(e);
            };
            reader.readAsDataURL(file);

            return deferred.promise;
          }

        }); //change

      } //link
    }; //return
  })
  .filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
    };
  });
