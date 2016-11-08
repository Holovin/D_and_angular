(function () {
  'use strict';

  angular.module('todoApp.ui')
    .directive('complete', function () {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          var el = element;

          scope.$watch('complete', function(newValue, oldValue) {
            if (newValue) {
              angular.element(el).addClass('complete');
            } else {
              angular.element(el).removeClass('complete');
            }
          });
        },
        scope: {
          complete: '<'
        }
      };
    });

})();