(function () {
  angular
    .module('todoApp')
    .component('todoList', {
      template: '<todo-list-row ng-repeat="row in vm.list" row="row"></todo-list-row>',
      controller: TodoListController,
      controllerAs: 'vm'
    });

  TodoListController.$inject =  ['networkService'];

  function TodoListController(networkService) {
    var vm = this;

    networkService.getData().then(function (res) {
      vm.list = res.todoList;
      console.log(vm.list);
    });


    this.$onInit = function () {
      console.log('init!');
    };
  }

})();
