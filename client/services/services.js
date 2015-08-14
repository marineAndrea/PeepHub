angular.module('app.services', ['firebase'])

  .directive('loggedin', [function(){
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'nav/loggedinnav.html'
    };
  }])

  .directive('loggedout', [function(){
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'nav/loggedoutnav.html'
    };
  }])

  .factory('Util', function() {
    var modifyLink = function(link) {
      var input = link.substring(23);
      var output = "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/" + input;
      return output;
    };
    return {modifyLink: modifyLink};
  })


  .factory('Auth', ['$window', '$firebaseAuth',
    function($window,$firebaseAuth){

      var firebaseAppUrl = 'https://banal-conga-line.firebaseio.com';
      var ref = new Firebase(firebaseAppUrl);
      var auth = $firebaseAuth(ref);

      var login = function(email, password){ 
        return auth.$authWithPassword({
          email: email,
          password: password
        });
      };

      var logout = function(){
        auth.$unauth();
        $window.localStorage.clear();
      };

      var signup = function(email, password){
        return auth.$createUser({
          email: email,
          password: password
        });
      };

      var removeUser = function(email, password){
        auth.$removeUser({
          email: email,
          password: password
        }).then(function() {
          console.log("User removed");
        }).catch(function(error) {
          console.log("Error removing user");
        });
      };

      var getUid = function(){
        return $window.localStorage.getItem('uid');
      };

      var isAuth = function(){
        return !!$window.localStorage.getItem('uid');
      };

      return {
        auth: auth,
        login: login,
        logout: logout,
        signup: signup,
        removeUser: removeUser,
        getUid: getUid,
        isAuth: isAuth
      };
    }
  ])

  .factory('HttpRequests', ['$http', '$location', function($http, $location){
    var hostUrl = 'http://localhost:8000/api';
    
    var signupUser = function(user){
      // send to firebase
      // var uid = UID from firebase
      console.log('user http request sent', JSON.stringify(user));
      return $http({
        method: 'POST',
        url: hostUrl + '/user',
        data: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      }); // route will be '/api/users' 
    };

    var loginUser = function(){
      // do authentication login here, promisified
      // then redirect
      $location.path('/user');
    };

    var getUser = function(uid) {
      return $http({
        method: 'GET',
        url: hostUrl + '/user/' + uid 
      });
    }; 

    var getAllUsers = function(){
      return $http({
        method: 'GET',
        url: hostUrl + '/users'
      });
    };

    var getRequests = function(uid) { // optional filter by username
      var url;
      if (uid) {
        url = hostUrl + '/requests/' + uid;
      } else {
        url = hostUrl + '/requests';
      }
      return $http({
        method: 'GET',
        url: url
      });
    };

    var postRequest = function(request){
      console.log('post request http request sent', JSON.stringify(request));
      return $http({
        method: 'POST',
        url: hostUrl + '/request',
        data: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    };

    var postEvent = function(ev){
      console.log('post event http request sent', ev);
      return $http({
        method: 'POST',
        url: hostUrl + '/event',
        data: ev, // stringify 
        headers: {
          'Content-Type': 'application/json'
        }
      });
    };

    var makeRequestInactive = function(id) {
      console.log('post request inactive http request sent', JSON.stringify(id));
      return $http({
        method: 'POST',
        url: hostUrl + '/toggle',
        data: JSON.stringify({id: id}),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    };

    var getEvents = function(){
      return $http({
        method: 'GET',
        url: hostUrl + '/event',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    };

    return {
      loginUser: loginUser,
      signupUser: signupUser,
      getUser: getUser,
      getRequests: getRequests,
      postRequest: postRequest,
      postEvent: postEvent,
      getEvents: getEvents,
      getAllUsers: getAllUsers,
      makeRequestInactive: makeRequestInactive
    };
  }]);