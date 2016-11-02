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
    vm.edit = edit;
    vm.removeItem = removeItem;

    function init() {
      vm.name = vm.task.name;
      vm.status = vm.task.status;
      vm.canEdit = false;
    }

    function edit() {
      // if (vm.canEdit) {
      //   vm.task.name = vm.name;
      //   vm.task.status = vm.status;
      // }
      //
      // vm.canEdit = !vm.canEdit;
    }

    function removeItem() {
      vm.onRemoveItem({
        taskItem: vm.task
      })
    }
  }

})();
