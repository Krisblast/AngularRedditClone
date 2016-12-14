'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:LoginCtrl
 * @description
 * # AboutCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('LoginCtrl', function ($scope, $http, $window) {

    $scope.userCreds = {};

    function saveToken(token){
      $window.localStorage['jwtToken'] = token;
    }

    function getToken(){
      return $window.localStorage['jwtToken'];
    }

    console.log(getToken());

    $scope.loginUser = function (user) {
      $http.post('http://laravel-jwt.app/api/login', user).success(function (response) {
        console.log(response);
        saveToken(response.token);
        $window.location.reload();
        //TODO make something smarter here.. maybe return user on login.. doesnt matter right now since we just reload the app..

        $http.get('http://laravel-jwt.app/api/restricted/subscribe').success(function (response) {
          console.log(response);
          $rootScope.user.subscriptions = response.data;
        })


      }).error(function (error) {
        console.log(error);
      });
    };

    $scope.logoutUser = function () {
      $http.get('http://laravel-jwt.app/api/restricted/logout').success(function (response) {
        console.log('logout success');
        console.log(response);
        saveToken(null);

        $window.location.reload();

      }).error(function (error) {
        console.log(error);
      });
    };


  });
