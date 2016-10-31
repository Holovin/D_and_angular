(function () {
  angular
    .module('todoApp')
    .component('todoListRow', {
      templateUrl: './todo/row/todo-row.template.html',
      controller: TodoRowController,
      controllerAs: 'vm',
      bindings: {
        row: '=',
        onUpdate: '&'
      }
    });

  function TodoRowController() {
    var vm = this;

    vm.canEdit = false;
  }

})();

