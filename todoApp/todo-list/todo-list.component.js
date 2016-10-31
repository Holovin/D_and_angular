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

      if (!res['todoList']) {
        throw new Error('Empty file!');
      }

      console.log(vm.list);
      vm.list = res['todoList'];

    }).catch(function (err) {
      console.log(err);
    });


    this.$onInit = function () {
      console.log('init!');
    };
  }

})();
