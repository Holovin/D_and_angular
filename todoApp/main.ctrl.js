(function () {
  'use strict';

  angular.module('todoApp').controller('MainCtrl', MainCtrl);
  MainCtrl.$inject = ['dataProviderService'];
  
  function MainCtrl(dataProvider) {
    var vm = this;

    init();

    function init() {
      dataProvider.getData().then(function (res) {
        vm.data = res;
      });
    }
  }
  
})();