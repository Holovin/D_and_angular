(function() {

  angular.module('todoApp', [
    'todoApp.ui',
    'dataProvider',
    'storage',
    'ui.router'
  ]).config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.when('', '/users');

      var states = [
        {
          abstract: 'true',
          name: 'app',
          url: '/',
          template: '<ui-view/>'
        },
        {
          name: 'app.users',
          url: 'users',
          template: '<h3>hello world!</h3>'
        },
        {
          name: 'app.todo',
          url: 'todo',
          template: '<h2>hello world!</h2>'
        },
        {
          name: 'app.meets',
          url: 'meets',
          template: '<h1>hello world!</h1>'
        }
      ];


      states.forEach(function(state) {
        $stateProvider.state(state);
      })
    }]);
  
})();
