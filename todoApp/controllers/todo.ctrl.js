(function () {

  'use strict';

  angular
    .module('todoApp')
    .controller('TodoCtrl', TodoCtrl);

  TodoCtrl.$inject = ['todoStorageService', 'owner', 'todo'];

  function TodoCtrl(todoStorageService, owner, todo) {
    var vm = this;

    vm.$onInit = init;
    vm.refresh = refresh;
    vm.loadLS = loadLS;
    vm.saveLS = saveLS;
    vm.clearLS = clearLS;
    vm.addItem = addItem;
    vm.removeItem = removeItem;


    function init() {
      vm.owner = owner;
      vm.todo = todo;
      vm.lsExist = false;
    }

    function refresh() {
      todoStorageService.loadTodo(vm.owner, true).then(function () {
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

      vm.todo = todoStorageService.getTodo();
    }

    function _grabDataFromService() {
      _updateTodoStorage();
      vm.owner = todoStorageService.getOwner();

      _updateLocalStorageState();
    }

    function _setDataService() {
      todoStorageService.setTodo(vm.todo);
    }
  }

})();
