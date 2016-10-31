(function () {
  angular
    .module('todoApp')
    .component('todoListRow', {
      templateUrl: './todo-list/todo-row.template.html',
      controller: TodoRowController,
      controllerAs: 'vm',
      bindings: {
        row: '=',
        onUpdate: '&'
      }
    });

  function TodoRowController() {
    var vm = this;

    console.log(vm, "row controller");

    vm.update = function (prop, value) {
      console.log(prop, value);
      vm.onUpdate({
        row: vm.row,
        prop: prop,
        value: value
      })
    };
  }

})();

