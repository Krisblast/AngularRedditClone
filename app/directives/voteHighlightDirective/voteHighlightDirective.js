angular.module('appApp').directive("voteHighlight", [function () {
  return {
    scope: {
      voteType: '='
    },
    link: function (scope, element, attrs) {
      scope.$watch('voteType', function (newVal) {
        if (newVal === 1 && attrs.voteHighlight === 'up') {
          element.addClass('highlightVoteUp')
        }
        if (newVal === 0 && attrs.voteHighlight === 'up') {
          element.removeClass('highlightVoteUp')
        }
        if (newVal === 1 && attrs.voteHighlight === 'down') {
          element.removeClass('highlightVoteDown')
        }
        if (newVal === 0 && attrs.voteHighlight === 'down') {
          element.addClass('highlightVoteDown')
        }
      });
    }
  };
}]);

