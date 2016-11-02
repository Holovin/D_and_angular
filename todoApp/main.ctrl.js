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
    vm.clearLS = clearLS;
    vm.addItem = addItem;
    vm.removeItem = removeItem;

    function init() {
      vm.todo = [];
      vm.user = [];
      vm.meetings = [];
      vm.lsExist = false;

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
      _updateLocalStorageState(true);
    }

    function clearLS() {
      todoStorageService.clearLS();
      _updateLocalStorageState(false);
    }

    function addItem(taskItem) {
      todoStorageService.addItem(taskItem);
    }

    function removeItem(taskItem) {
      todoStorageService.removeItem(taskItem);
    }


    function _updateLocalStorageState(state) {
      if (_.isBoolean(state)) {
        vm.lsExist = state;
        return;
      }

      vm.lsExist = todoStorageService.checkLS();
    }

    function _updateTodoStorage(todo) {
      if (_.isObject(todo)) {
        vm.todo = todo;
        return;
      }

      vm.todo = todoStorageService.getData();
    }

    function _grabDataFromService() {
      _updateTodoStorage();
      vm.user = todoStorageService.getUser();
      vm.meetings = todoStorageService.getMeetings();
      _updateLocalStorageState();
    }

    function _setDataService() {
      todoStorageService.setData(vm.todo);
    }
  }

})();
