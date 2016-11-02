(function () {
  'use strict';

  angular
    .module('todoApp.ui')
    .component('emptyFill', {
      templateUrl: './todo/empty-fill/empty-fill.template.html',
      controllerAs: 'vm',
      bindings: {
        list: '<'
      }
    });

})();
