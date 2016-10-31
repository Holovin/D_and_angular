(function () {
  'use strict';

  angular
    .module('todoApp')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['networkService'];

  function MainCtrl(networkService) {
    var vm = this;

    init();

    function init() {
      networkService.getData().then(function (res) {
        vm.data = res;
      });

    }
  }

})();