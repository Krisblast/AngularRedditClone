angular.module('appApp')

  .component('thread', {
    templateUrl: 'components/threadComponent/template.html',
    controller: function($routeParams){

      var $ctrl = this;


      $ctrl.currentPage = $routeParams.page;


      if($ctrl.showComment === undefined){
        $ctrl.showComment = true;
      }
      if($ctrl.showSub === undefined){
        $ctrl.showSub = false;
      }

    },
    bindings: {
      thread: '<',
      index: '<?',
      showComment: '<?',
      showSub: '=?'
    }
  });
