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
            users: ['usersStorageService', function (usersStorageService) {
              return usersStorageService.loadUsers();
            }],
            currentUser: ['users', 'usersStorageService', function (users, usersStorageService) {
              return usersStorageService.getCurrentUser();
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
          name: 'app.meetings',
          url: 'meetings',
          controller: 'MeetingsCtrl',
          controllerAs: 'vm',
          template: '<meetings meetings="vm.meetings" owner="vm.owner"></meetings>',
          resolve: {
            owner: ['usersStorageService', function (usersStorageService) {
              return usersStorageService.getCurrentUser();
            }],

            checkUser: ['$timeout', '$state', '$q', 'owner', function ($timeout, $state, $q, owner) {
              var defer = $q.defer();

              if (owner) {
                defer.resolve(owner);
              } else {

                $timeout(function () {
                  console.log("Access denied", owner);
                  $state.go('app.users');
                });

                defer.reject();
              }

              return defer.promise;
            }],

            meetings: ['meetingsStorageService', 'checkUser', function (meetingsStorageService, checkUser) {
              return meetingsStorageService.loadMeetings(checkUser);
            }]
          }
        }
      ];

      states.forEach(function(state) {
        $stateProvider.state(state);
      });
    }]);
})();
