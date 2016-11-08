(function() {

  angular.module('todoApp', [
    'todoApp.ui',
    'dataProvider',
    'storage',
    'ui.router'
  ]).config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.when('', '/users');
      $urlRouterProvider.otherwise('/users');

      var states = [
        {
          abstract: 'true',
          name: 'app',
          url: '/',
          views: {
            'nav': {
              template: '<nav-bar></nav-bar>'
            },
            'content': {
              template: '<div ui-view></div>'
            }
          }
        },
        {
          name: 'app.users',
          url: 'users',
          controller: 'UsersCtrl',
          controllerAs: 'vm',
          template: '<users users="vm.users" current-user="vm.currentUser" on-select="vm.select(user)"></users>',
          resolve: {
            users: ['userStorageService', function (userStorageService) {
              return userStorageService.loadUsers();
            }],
            currentUser: ['userStorageService', function (userStorageService) {
              return userStorageService.getCurrentUser();
            }]
          }
        },
        {
          name: 'app.todo',
          url: 'todo',
          views: {
            'content@app': {
              template: '<todo-list></todo-list>'
            }
          }
        },
        {
          name: 'app.meets',
          url: 'meets',
          views: {
            'content@app': {
              template: '<todo-meetings></todo-meetings>'
            }
          }
        }
      ];

      states.forEach(function(state) {
        $stateProvider.state(state);
      });
    }]);
})();
