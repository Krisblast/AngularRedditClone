angular.module('appApp')
  .component('subscribeBtn', {
    templateUrl: 'components/subscribeComponent/template.html',
    controller: function(subscribeService){
      var $ctrl = this;

      $ctrl.subscribeToSub = function (sub) {
        subscribeService.subscribeToSub(sub.id).then(function () {
          $ctrl.sub.subscribed = true;
        });
      };

      $ctrl.unsubscribeToSub = function (sub) {
        subscribeService.unsubscribeToSub(sub.id).then(function () {
          $ctrl.sub.subscribed = false;
        });
      };


    },
    bindings: {
      sub: '<'
    }
  });
