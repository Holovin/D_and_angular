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
        lsExist: '<',
        onRefresh: '&',
        onLoadLocalStorage: '&',
        onSaveLocalStorage: '&',
        onClearLocalStorage: '&',
        onAddItem: '&',
        onRemoveItem: '&'
      }
    });

  function TodoListController() {
    var vm = this;

    vm.$onInit = init;
    vm.refresh = refresh;

    vm.loadLS = loadLS;
    vm.saveLS = saveLS;
    vm.clearLS = clearLS;

    vm.addItem = addItem;
    vm.removeItem = removeItem;

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

    function clearLS() {
      vm.onClearLocalStorage();
    }

    function addItem(taskItem) {
      vm.onAddItem({taskItem: taskItem});
    }

    function removeItem(taskItem) {
      vm.onRemoveItem({taskItem: taskItem});
    }
  }

})();
