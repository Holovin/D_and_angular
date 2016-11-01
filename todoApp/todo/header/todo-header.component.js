(function () {

  angular
    .module('todoApp')
    .component('todoHeader', {
      templateUrl: './todo/header/todo-header.template.html',
      controller: TodoFooterController,
      controllerAs: 'vm',
      require: {
        parent: '^todoList'
      }
    });

  function TodoFooterController() {
    var vm = this;

    vm.sortItems = [
      {
        sortField: null,
        displayName: 'No sort '
      }, {
        sortField: 'name',
        displayName: 'Name'
      }, {
        sortField: 'status',
        displayName: 'Status'
      }
    ];

    vm.$onInit = init;
    vm.sortList = sortList;
    vm.sortReverse = sortReverse;

    function init() {
      // ng-init can this too
      vm.sortSelected = vm.sortItems[0];
    }

    function sortList(propertyName) {
      console.log(propertyName);

      vm.parent.reverseFlag = (propertyName === vm.parent.propertyName) ? !vm.parent.reverseFlag : false;
      vm.parent.propertyName = propertyName;
    }

    function sortReverse() {
      vm.parent.reverseFlag = !vm.parent.reverseFlag;
    }

  }

})();
