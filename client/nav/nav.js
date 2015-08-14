angular.module('app.nav',[])
.controller('loggedInNavController', ['$scope','$location', '$window', 'HttpRequests', 'Auth', function($scope, $location, $window, HttpRequests, Auth){
  $scope.showRequests = false;
  $scope.showEvents = false;
  
  $scope.request = {};
  $scope.ev = {
    organizer: $window.localStorage.getItem('uid')
  };

  $scope.redirect = function(newpath){
    $location.path(newpath);
  };

  $scope.togglePostRequest = function(){
    $scope.showEvents = false;
    $scope.showRequests = !$scope.showRequests;  
  };

  $scope.togglePostEvent = function(){
    $scope.showRequests = false;
    $scope.showEvents = !$scope.showEvents;  
  };

  $scope.sendPostRequest = function(){
    $scope.request.uid = Auth.getUid();
    $scope.togglePostRequest();
    HttpRequests.postRequest($scope.request)
    .then(function(data){
      console.log('request posted', data);
    }, function(err){
      console.log('error posting request', err);
    });
    $location.path('/user');
  };

  $scope.parseHashtags = function(){
    $scope.ev.hashtags = $scope.ev.hashtags.split(' ');
  };

  $scope.sendPostEvent = function(){
    console.log('before',$scope.ev.hashtags);
    $scope.togglePostEvent();
    $scope.parseHashtags();
    console.log('after',$scope.ev.hashtags);
    HttpRequests.postEvent($scope.ev)
      .then(function(data){
        console.log('event posted', data);
      }, function(err){
        console.log('error posting event', err);
      });
  };

  $scope.logout = function(){
    Auth.logout();
    $location.path('/login');
  };
}])
.controller('loggedOutNavController', ['$scope','$location', 'HttpRequests', 'Auth', function($scope, $location, HttpRequests, Auth){
    $scope.goToLogin = function() {
      $location.path('/login');
    };

    $scope.goToSignup = function() {
      $location.path('/signup');
    };

}]);
























