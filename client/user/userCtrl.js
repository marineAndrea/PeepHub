angular.module('app.user', [])
.controller('UserController',['$sce', '$scope', '$location', '$window','$routeParams', 'HttpRequests', 'Util',
  function($sce, $scope, $location, $window, $routeParams, HttpRequests, Util){
    $scope.user = {};
    $scope.modifyLink = Util.modifyLink;
    $scope.d3values = [1,2,3,4,5,6,7];

    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };
  
    $scope.deleteRequest = function(index) {
      console.log('index', index, 'sc-req', $scope.requests);
      HttpRequests.makeRequestInactive($scope.requests[index]._id);
    };
    
    var init = function() {
      
      if ($routeParams.uid === undefined) {
        console.log('no user id');
        $location.path('/user/' + $window.localStorage.getItem('uid'));
      }

      HttpRequests.getUser($routeParams.uid)
      .then(function(user){
        // if user is null redirect to user's profile
        if (user.data === "null") {
          $location.path('/user/' + $window.localStorage.getItem('uid'));
        }
        $scope.user = user.data;
      }).catch(function(err){ 
        console.log('error fetching user', err);
      });

      HttpRequests.getRequests()
      .then(function(requests){
        var requestsByUid = [];
        for (var i = 0; i < requests.data.length; i++) {
          if (requests.data[i]['uid'] === $routeParams.uid) {
            requestsByUid.push(requests.data[i]);
          }
        }
        $scope.requests = requestsByUid;
      }).catch(function(err){ 
        console.log('error fetching requests', err);
      });
    };

    init();
}]);
