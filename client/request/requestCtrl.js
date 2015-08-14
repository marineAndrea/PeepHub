angular.module('app.request', [])
.controller('RequestController', ['$scope', '$http', 'HttpRequests',
  function($scope, $http, HttpRequests){
    $scope.search = {};

    var init = function() {
      HttpRequests.getRequests() // get all active requests
      .then(function(requests){
        $scope.requests = requests.data;
      }).catch(function(err){
        console.log('error fetching requests', err);
      });
    };

    init(); 
}]);