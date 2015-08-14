angular.module('app.event', [])
.controller('EventController', ['$scope', '$http', 'HttpRequests', 'randomEvent', function($scope, $http, HttpRequests, randomEvent){
    $scope.search = {};

    $scope.events = [];

    $scope.makeRandomEvent = function(){
      HttpRequests.postEvent(randomEvent());
    };

    $scope.getEvents = function(){
      console.log(HttpRequests.getEvents);
      HttpRequests.getEvents()
        .then(function(data){
          console.log('---------->', data);
          $scope.events = data.data;
        });
      };

    $scope.getEvents();
}]);

