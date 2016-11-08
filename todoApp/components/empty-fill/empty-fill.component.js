(function () {
  'use strict';

  angular
    .module('todoApp.ui')
    .component('emptyFill', {
      templateUrl: './components/empty-fill/empty-fill.template.html',
      controllerAs: 'vm',
      bindings: {
        list: '<',
        text: '@'
      }
    });

})();
