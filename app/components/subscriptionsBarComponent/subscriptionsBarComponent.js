angular.module('appApp')
  .component('subscriptionsBar', {
    templateUrl: 'components/subscriptionsBarComponent/template.html',
    controller: function($rootScope, $http){
      var $ctrl = this;
      $http.get('http://laravel-jwt.app/api/restricted/subscribe').success(function (response) {
        console.log(response);
        $ctrl.subscriptions = response.data;
      })
    }
  });
