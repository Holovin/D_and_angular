(function () {
  'use strict';

  angular
    .module('todoApp')
    .factory('dataProviderService', DataProviderService);

  DataProviderService.$inject = ['$http'];

  function DataProviderService($http) {
    return {
      getData: getData
    };

    function getData() {
      return $http.get('data.json').then(function(res) {
        return res.data;
      })
    }
  }

})();
