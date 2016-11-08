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
          controller: 'TodoCtrl',
          controllerAs: 'vm',
          template: '<todo-list owner="vm.owner" list="vm.todo" ls-exist="vm.lsExist" on-refresh="vm.refresh()"' +
                    'on-load-local-storage="vm.loadLS()" on-clear-local-storage="vm.clearLS()"' +
                    'on-save-local-storage="vm.saveLS()" on-remove-item="vm.removeItem(taskItem)"' +
                    'on-add-item="vm.addItem(taskItem)"></todo-list>',
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

            todo: ['todoStorageService', 'checkUser', function (todoStorageService, checkUser) {
               return todoStorageService.loadTodo(checkUser, false);
            }]
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
