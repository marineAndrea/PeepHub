angular.module('app.nav',[])
.controller('loggedInNavController', ['$scope','$location', '$window', 'HttpRequests', 'Auth', function($scope, $location, $window, HttpRequests, Auth){
  $scope.showRequests = false;
  $scope.showEvents = false;
  $scope.years = [2015,2016,2017];
  $scope.months = [1,2,3,4,5,6,7,8,9,10,11,12];
  $scope.days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  $scope.neighborhoods = ["Mission", "SOMA", "Downtown", "Western Addition", "Marina", "Castro", "Pac Heights", "Haight-Ashbury", "Oakland", "Berkeley"];
  
  $scope.talents = ['piano', 'guitar', 'bass', 'trombone', 'flute', 'violin', 'cello', 'voice', 'trumpet'];
  $scope.levels = [1,2,3,4,5,6,7,8,9,10];
  $scope.request = {};
  $scope.ev = {
    organizer: $window.localStorage.getItem('uid')
  };
  $scope.date = {};

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

  $scope.parseDate = function(){
    $scope.ev.date = new Date($scope.date.year, $scope.date.month, $scope.date.day);
  };

  $scope.sendPostEvent = function(){
    console.log('before',$scope.ev.hashtags);
    $scope.togglePostEvent();
    $scope.parseHashtags();
    $scope.parseDate();
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
























