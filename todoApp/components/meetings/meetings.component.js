(function () {
  'use strict';

  angular
    .module('todoApp.ui')
    .component('meetings', {
      templateUrl: './components/meetings/meetings.template.html',
      controllerAs: 'vm',
      bindings: {
        meetings: '<'
      }
    });

})();
