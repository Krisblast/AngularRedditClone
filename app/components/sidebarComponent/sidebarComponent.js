angular.module('appApp')
  .component('sidebar', {
    templateUrl: 'components/sidebarComponent/template.html',
    controller: function($rootScope, $http){
      var $ctrl = this;

    },
    bindings: {
      sub: '<'
    }

  });
