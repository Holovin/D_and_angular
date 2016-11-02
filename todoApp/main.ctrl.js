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
    vm.addItem = addItem;
    vm.removeItem = removeItem;

    function init() {
      vm.todo = [];
      vm.user = [];
      vm.meetings = [];
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

    function addItem() {
      todoStorageService.addEmptyItem();
    }

    function removeItem(taskItem) {
      todoStorageService.removeItem(taskItem);
    }


    function _grabDataFromService() {
      vm.todo = todoStorageService.getData();
      vm.user = todoStorageService.getUser();
      vm.meetings = todoStorageService.getMeetings();
    }

    function _setDataService() {
      todoStorageService.setData(vm.todo);
    }
  }

})();
