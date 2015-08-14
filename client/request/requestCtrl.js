angular.module('app.request', [])
.controller('RequestController', ['$scope', '$http', 'HttpRequests', 
  function($scope, $http, HttpRequests){
    $scope.search = {};

    // $scope.requests = [
    //   { talent: 'drums', level: '8', location: 'emeryville'},
    //   { talent: 'trumpet', level: '7', location: 'the mission'},
    //   { talent: 'violin', level: '5', location: 'novato'}
    // ];

    var init = function() {
      HttpRequests.getRequests() // get all active requests
      .then(function(requests){
        $scope.requests = requests.data;
      }).catch(function(err){ 
        console.log('error fetching requests', err);
      });
    };

    init();



    // TODO: call to Request.getRequest( {with inputs from the form}) 
}]);