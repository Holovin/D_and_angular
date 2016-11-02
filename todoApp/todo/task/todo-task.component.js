(function () {
  'use strict';

  angular
    .module('todoApp.ui')
    .component('todoTask', {
      templateUrl: './todo/task/todo-task.template.html',
      controller: TodoRowController,
      controllerAs: 'vm',
      bindings: {
        task: '<',
        onRemoveItem: '&'
      }
    });

  function TodoRowController() {
    var vm = this;

    vm.$onInit = init;
    vm.$onChanges = updateLocalInput;
    vm.edit = edit;
    vm.removeItem = removeItem;

    function init() {
      vm.taskLocal = {};
      vm.canEdit = false;

      updateLocalInput();
    }

    function updateLocalInput() {
      if (vm.taskLocal) {
        vm.taskLocal.name = vm.task.name;
        vm.taskLocal.status = vm.task.status;
      }
    }

    function edit() {
      if (vm.canEdit) {
        vm.task.name = vm.taskLocal.name;
        vm.task.status = vm.taskLocal.status;
      }

      vm.canEdit = !vm.canEdit;
    }

    function removeItem() {
      vm.onRemoveItem({
        taskItem: vm.task
      })
    }
  }

})();
