(function () {
  'use strict';

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

    vm.filter = {
      name: '',
      status: ''
    };

    vm.$onInit = init;
    vm.sortList = sortList;
    vm.sortReverse = sortReverse;
    vm.filterList = filterList;
    vm.filterStrict = filterStrict;

    function init() {
      vm.sortSelected = vm.sortItems[0];
      vm.filterList(vm.filter);
    }

    function sortList(propertyName) {
      vm.parent.reverseFlag = (propertyName === vm.parent.propertyName) ? !vm.parent.reverseFlag : false;
      vm.parent.propertyName = propertyName;
    }

    function sortReverse() {
      vm.parent.reverseFlag = !vm.parent.reverseFlag;
    }

    function filterList(filter) {
      vm.parent.filter = filter;
    }

    function filterStrict() {
      vm.parent.filterStrictFlag = !vm.parent.filterStrictFlag;
    }
  }

})();
