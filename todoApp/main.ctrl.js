(function () {
  'use strict';

  angular
    .module('todoApp')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['todoStorageService'];

  function MainCtrl(todoStorageService) {
    var vm = this;

    vm.$onInit = init;
    vm.refresh = refresh;
    vm.loadLS = loadLS;
    vm.saveLS = saveLS;

    function init() {
      vm.todo = [];
      refresh();
    }


    function refresh() {
      todoStorageService.loadHttp().then(function () {
        _grabDataFromService();
      });
    }

    function loadLS() {
      todoStorageService.loadLS();
      _grabDataFromService();
    }

    function saveLS() {
      _setDataService();
      todoStorageService.saveLS();
    }

    function _grabDataFromService() {
      vm.todo = todoStorageService.getData();
      vm.user = todoStorageService.getUser();

      console.log('MainCtrl data: ', vm.todo);
    }

    function _setDataService() {
      todoStorageService.setData(vm.todo);
    }


  }

})();
