(function () {
  angular
    .module('todoApp')
    .component('todoListRow', {
      templateUrl: './todo-list/todo-row.template.html',
      controller: TodoRowController,
      bindings: {
        row: '<'
      }
    });

  function TodoRowController() {
    var vm = this;

    vm.setValue = function (val) {
      vm.data = val;
    }
  }

})();

