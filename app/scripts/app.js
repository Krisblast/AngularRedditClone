'use strict';

/**
 * @ngdoc overview
 * @name appApp
 * @description
 * # appApp
 *
 * Main module of the application.
 */
angular
  .module('appApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularMoment',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'scripts/Frontpage/frontpage.html',
        controller: 'FrontpageCtrl',
        controllerAs: 'frontpage',
        resolve: {
          redirectIfNoAuth: function ($http,$location) {
            $http.get('http://laravel-jwt.app/api/restricted/user').success(function (response) {
            }).error(function (error) {
              $location.path('#/all');
            });
          }
        }
      })
      .when('/user/:user_id', {
        templateUrl: 'scripts/PublicUser/publicUser.html',
        controller: 'PublicUserCtrl',
        controllerAs: 'publicUser',
        resolve: {
          setPage: function ($rootScope) {
            $rootScope.activePage =  null;
          }
        }
      })
      .when('/login', {
        templateUrl: 'scripts/Signup/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login',
        resolve: {
          setPage: function ($rootScope) {
            $rootScope.activePage =  null;
          }
        }
      })
      .when('/register', {
        templateUrl: 'scripts/Signup/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register',
        resolve: {
          setPage: function ($rootScope) {
            $rootScope.activePage =  null;
          }
        }
      })
      .when('/subs', {
        templateUrl: 'scripts/Subs/subs.html',
        controller: 'SubsCtrl',
        controllerAs: 'subs',
        resolve: {
          setPage: function ($rootScope) {
            $rootScope.activePage =  null;
          }
        }
      })

      .when('/all', {
        templateUrl: 'scripts/All/all.html',
        controller: 'AllCtrl',
        controllerAs: 'all',
        reloadOnSearch:false
      })

      .when('/sub/:id', {
        templateUrl: 'scripts/Threads/threads.html',
        controller: 'ThreadsCtrl',
        controllerAs: 'threads'
      })

      .when('/sub/:id/comments/:thread_id', {
        templateUrl: 'scripts/Comments/comments.html',
        controller: 'CommentsCtrl',
        controllerAs: 'comment'
      })

      .otherwise({
        redirectTo: '/all'
      });



  })




  //TODO Make some magic with redirect route on unauth

  .run(function ($http,$window,$rootScope) {
    $rootScope.user = {
      subscriptions: []
    };
    if($window.localStorage['jwtToken']){
      console.log('we have a token, now try to get user');
      $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.localStorage['jwtToken'];
      $http.get('http://laravel-jwt.app/api/restricted/user').success(function (response) {
        $rootScope.user = response;
      }).error(function (error) {
        console.log(error);
        $rootScope.user = null;

      });
    }

    $http.get('http://laravel-jwt.app/api/restricted/subscribe').success(function (response) {
      console.log(response);
      $rootScope.user.subscriptions = response.data;
    })





  });


