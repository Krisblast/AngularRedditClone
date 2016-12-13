angular.module('appApp')

  .component('thread', {
    templateUrl: 'components/threadComponent/template.html',
    controller: function(){
      this.showComment = true;
      this.showSub = false;

    },
    transclude: true,
    bindings: {
      thread: '=',
      index: '=?',
      showComment: '=?',
      showSub: '=?'
    }
  });
