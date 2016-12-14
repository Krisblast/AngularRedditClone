angular.module('appApp')

  .component('thread', {
    templateUrl: 'components/threadComponent/template.html',
    controller: function(){

      var $ctrl = this;


      if($ctrl.showComment === undefined){
        $ctrl.showComment = true;
      }
      if($ctrl.showSub === undefined){
        $ctrl.showSub = false;
      }

    },
    transclude: true,
    bindings: {
      thread: '=',
      index: '=?',
      showComment: '=?',
      showSub: '=?'
    }
  });
