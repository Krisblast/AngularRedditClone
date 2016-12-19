angular.module('appApp')
  .component('pager', {
    templateUrl: 'components/pagerComponent/template.html',
    controller: function (threadsService, $location, $anchorScroll, $routeParams, $timeout) {
      var $ctrl = this;

      $ctrl.config = {
        orderType: 'hot',
        nextPage: 1
      };

      $ctrl.getThreads = function (page, orderType, resetData, setPage) {

        if (setPage) {
          $ctrl.nextPage += 1;
          $location.search('page', page);
        }

        if (resetData) {
          $ctrl.threads = [];
          $ctrl.nextPage = 1;
        }


        if ($ctrl.type === 'all') {
          threadsService.getAllThreads(page, orderType).then(function (response) {
            $ctrl.config.orderType = orderType;
            $ctrl.config.last_page = response.data.last_page;
            $ctrl.threads = $ctrl.threads.concat(response.data.data);
          });
        }

        if ($ctrl.type === 'sub') {
          threadsService.getThreadsForSub($ctrl.subId, page, orderType).then(function (response) {
            $ctrl.config.orderType = orderType;
            $ctrl.config.last_page = response.data.last_page;
            $ctrl.threads = $ctrl.threads.concat(response.data.data);
          });
        }
      };


      if ($location.search().page) {

        $ctrl.nextPage = parseInt($location.search().page);
        $ctrl.nextPage += 1;

        $ctrl.getThreads(1, 'hot', false, false);

        for (var i = 1; i < $location.search().page; i++) {
          $ctrl.getThreads(i + 1, 'hot', false, false);
        }


      }

      else {
        $ctrl.nextPage = 1;
        $ctrl.getThreads($ctrl.nextPage, 'hot', false, true);

      }

      $ctrl.scrollTo = function (id) {
        $location.hash('page' + id);
        $anchorScroll();
      };


      //FIXME
      $timeout(function () {
        $ctrl.scrollTo($routeParams.page)
      }, 1000);

    },
    bindings: {
      threads: '=',
      type: '<',
      subId: '<?'
    }
  });
