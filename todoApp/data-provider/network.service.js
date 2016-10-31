(function () {
  'use strict';

  angular
    .module('dataProvider')
    .factory('networkService', NetworkService);

  NetworkService.$inject = ['$http'];

  function NetworkService($http) {
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
