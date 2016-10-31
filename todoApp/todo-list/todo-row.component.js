(function () {
  angular
    .module('todoApp')
    .component('todoListRow', {
      template: '<ul>{{$ctrl.row.name}}</ul>',
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

