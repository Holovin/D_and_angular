(function () {
  'use strict';

  angular
    .module('todoApp.ui')
    .component('todoNewTask', {
      templateUrl: './components/todo/newTask/todo-new-task.template.html',
      controller: TodoNewTaskController,
      controllerAs: 'vm',
      bindings: {
        onAddItem: '&'
      }
    });

  function TodoNewTaskController() {
    var vm = this;

    vm.$onInit = init;
    vm.addItem = addItem;

    function init() {
      vm.taskLocal = {
        status: false,
        name: ''
      };
    }

    function addItem() {
      vm.onAddItem({taskItem: vm.taskLocal});
      init();
    }
  }

})();
