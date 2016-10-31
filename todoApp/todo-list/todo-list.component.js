(function () {

  angular
    .module('todoApp')
    .component('todoList', {
      template: '<todo-list-row ng-repeat="item in vm.list" row="item"></todo-list-row><a ng-click="vm.add()" qqq="vm">[add random]</a>',
      controller: TodoListController,
      controllerAs: 'vm'
    });

  TodoListController.$inject =  ['networkService'];
  function TodoListController(networkService) {
    var vm = this;
    vm.init = init;
    vm.hey = hey;
    vm.add = add;

    init();

    function add() {
      item = {
        'name': Math.random() % 10
      };


      vm.list.push(item);
    }

    function init() {
      networkService.getData().then(function (res) {

        if (!res['todoList']) {
          throw new Error('Empty file!');
        }

        console.log(vm.list);
        vm.list = res['todoList'];

        for (var i = 0; i < 2; i++) {
          vm.list[i].name += Math.random() % 10;
        }

      }).catch(function (err) {
        console.log(err);
      });
    }


    function hey() {
      console.log("hop!");
    }

  }

})();

