(function () {
  'use strict';

  angular
    .module('todoApp')
    .component('todoList', {
      templateUrl: './todo/list/todo-list.template.html',
      controller: TodoListController,
      controllerAs: 'vm',
      bindings: {
        list: '<',
        onRefresh: '&',
        onLoadLocalStorage: '&',
        onSaveLocalStorage: '&'
      }
    });

  function TodoListController() {
    var vm = this;

    vm.$onInit = init;
    vm.refresh = refresh;
    vm.loadLS = loadLS;
    vm.saveLS = saveLS;

    function init() {
      vm.reverseFlag = false;
      vm.propertyName = null;

      vm.filterStrictFlag = false;
      vm.filter = null;
    }

    function refresh() {
      vm.onRefresh();
    }

    function loadLS() {
      vm.onLoadLocalStorage();
    }

    function saveLS() {
      vm.onSaveLocalStorage();
    }
  }

})();
