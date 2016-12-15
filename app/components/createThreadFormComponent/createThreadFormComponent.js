angular.module('appApp')
  .component('createThreadForm', {
    templateUrl: 'components/createThreadFormComponent/template.html',
    controller: function($http){
      var $ctrl = this;

      $ctrl.config = {
        showCreate: false,
        createType: 'link',
        orderType: 'hot'
      };

      $ctrl.newThread = {};

      $ctrl.postThread = function (newThread) {
        $ctrl.newThread.sub_id = $ctrl.subId;


        $http.post('http://laravel-jwt.app/api/restricted/thread', newThread).success(function (response) {
          $ctrl.subThreads.push(response.data);




          $ctrl.config.showCreate = false;
          $ctrl.newThread = {
            sub_id: $ctrl.subId
          };
        });

      };
    },
    bindings: {
      subThreads: '<?',
      subId: '<'
    }
  });
