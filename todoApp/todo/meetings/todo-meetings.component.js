(function () {
  'use strict';

  angular
    .module('todoApp.ui')
    .component('todoMeetings', {
      templateUrl: './todo/meetings/todo-meetings.template.html',
      controllerAs: 'vm',
      bindings: {
        meetings: '<'
      }
    });

})();
