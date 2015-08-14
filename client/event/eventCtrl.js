angular.module('app.event', [])
.controller('EventController', ['$scope', '$http', 'HttpRequests', 'randomEvent', function($scope, $http, HttpRequests, randomEvent){
    $scope.search = {};
    $scope.events = [];

    $scope.makeRandomEvent = function(){
      HttpRequests.postEvent(randomEvent());
    };

    $scope.getEvents = function(){
      HttpRequests.getEvents()
        .then(function(data){
          $scope.events = data.data;
        });
      };

    $scope.getEvents();
}]);

