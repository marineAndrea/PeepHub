angular.module('app.signin', ['app.services'])

.controller('signinController', ['$scope', '$location', 'HttpRequests', 'Auth', '$window', function($scope, $location, HttpRequests, Auth, $window){
  
  $scope.neighborhoods = ["Mission", "SOMA", "Downtown", "Western Addition", "Marina", "Castro", "Pac Heights", "Haight-Ashbury", "Oakland", "Berkeley"];
  
  $scope.talents = ['piano', 'guitar', 'bass', 'trombone', 'flute', 'violin', 'cello', 'voice', 'trumpet'];
  $scope.levels = [1,2,3,4,5,6,7,8,9,10];

  
  $scope.user = {
    talents: [],
    links: []
  };

  $scope.newTalent = {};

  $scope.generateUsers = function() {
    var names = [["Sophia", "Bong"],["Eliot", "Winder"],["Patrick", "Tran"], ["Marine", "Guillanton"], ["Miles","Davis"], ["Les","Claypool"], ["John","Coltrane"],["Sonny", "Rollins"],["Jimmy", "Page"],["Lil", "Wayne"],["Johann","Bach"],["Joan","Jett"],["Kurt","Kobain"],["Amy", "Winehouse"],["Lou","Reed"]];

    var pics = ["http://cdn.playbuzz.com/cdn/583f3e13-e98b-420b-bb1f-f342f6d4f3cf/18d4ca21-dc86-4a1f-bc38-e24e33f7b228.jpg","http://www.pleasantwalls.com/wp-content/uploads/2014/07/animal-8.jpg", "http://www.pleasantwalls.com/wp-content/uploads/2014/07/animal-6.jpg","http://ngm.nationalgeographic.com/2008/03/animal-minds/img/animal-minds-11.655.jpg","http://static.ddmcdn.com/gif/6-portrait_jorgenrasmussen_wannaplay-australiansealion-best-ocean-animal-photos-of-2013-6740x440.jpg","http://f.fastcompany.net/multisite_files/cocreate/imagecache/inline-large/post-inline/slide-14-zoo-book-animals.jpg","http://news.nationalgeographic.com/news/2008/10/photogalleries/animal-photos-week14/images/primary/04-animals-461sp102308.jpg"];

      var fightAsync = function(userObj){
            Auth.signup(userObj.email, userObj.password)
              .then(function(userData){
                userObj.uid = userData.uid;
                HttpRequests.signupUser(userObj, userData)
                  .then(function(response){
                    
                  })
                  .catch(function(){
                   console.log('login failed!!!');
                  });
              })
              .catch(function(error) {
                    console.log('error posting user', error);
                  });
                };

    var links = ["https://soundcloud.com/platform/branko-louca-feat-mc-bin-laden-marginal-men-boiler-room-debuts", "https://soundcloud.com/svntvmverte/arca-lonelythuggsanta-muerte-bootleg","https://soundcloud.com/lindsay-lowend/feb-17","https://soundcloud.com/tiara-thomas/my-ways?in=tiara-thomas/sets/up-in-smoke", "https://soundcloud.com/soulection/soulection-radio-show-220-live-from-amsterdam"];
    
    for (var i = 0; i < names.length; i++){
      var newUser = {
        username: names[i][0] + " " + names[i][1],
        email: names[i][0] + names[i][1] + "@banalcongaline.com",
        password: "admin",
        profilepic: pics[Math.floor(Math.random()*pics.length)],
        talents: {},
        links: [],
        location: $scope.neighborhoods[Math.floor(Math.random*$scope.neighborhoods.length)]
      };

      for (var j = 0; j < Math.floor(Math.random()*3); j++) {
        newUser.links.push(links[Math.floor(Math.random()*links.length)]);
      }

      for (var k = 0; k < Math.floor(Math.random()*3); k++) {
        newUser.talents[Math.floor(Math.random()*links.length)] = Math.floor(Math.random()*9) + 1;
      }

      fightAsync(newUser);

    }
  };

  $scope.signupAuto = function() {
     $scope.user.talents = convertTalentsToObject();
     var email = $scope.user.email;
     var password = $scope.user.password;
     Auth.signup(email, password)
     .then(function(userData){
       $scope.user.uid = userData.uid;
       HttpRequests.signupUser($scope.user, userData)
       .then(function(response){
         $window.localStorage.setItem('uid', userData.uid);
         Auth.login(email, password)
          .then(function(){
           $location.path('/user/'+ userData.uid);
          })
          .catch(function(){
            console.log('login failed!!!');
          });
       }).catch(function(error) {
         console.log('error posting user', error);
         Auth.removeUser(email, password);
       }); 
     })
     .catch(function(error){
       console.log("Firebase signup failed:",error);
       $scope.user.talents = [];
     });
   };

  $scope.addTalent = function(){
    if ( $scope.newTalent.talent !== "" && $scope.newTalent.level !== ""){
      $scope.user.talents.push({
        talent: $scope.newTalent.talent,
        level: $scope.newTalent.level
      });
      $scope.newTalent.talent = "";
      $scope.newTalent.level = "";
    } else {
      // TODO: add a message that one of the forms is blank
    }
  };

  $scope.addLink = function(){
    if ($scope.newLink !== "") {
      $scope.user.links.push($scope.newLink);
      $scope.newLink = "";
    } else {
      // TODO: add a message that one of the forms is blank
    }
  };

  $scope.login = function(){
    Auth.login($scope.user.email, $scope.user.password)
    .then(function(authData){
      // login successful with user with ID: authData.uid
      $window.localStorage.setItem('uid', authData.uid);
      $location.path('/user/'+ authData.uid); // /user/UID
    }).catch(function(error){
      console.error("Firebase login failed:",error);
      $location.path('/login');
    });
  };

  $scope.signup = function() {
     $scope.user.talents = convertTalentsToObject();
     var email = $scope.user.email;
     var password = $scope.user.password;
     Auth.signup(email, password)
     .then(function(userData){
       $scope.user.uid = userData.uid;
       HttpRequests.signupUser($scope.user, userData)
       .then(function(response){
         $window.localStorage.setItem('uid', userData.uid);
         Auth.login(email, password)
          .then(function(){
           $location.path('/user/'+ userData.uid);
          })
          .catch(function(){
            console.log('login failed!!!');
          });
       }).catch(function(error) {
         console.log('error posting user', error);
         Auth.removeUser(email, password);
       }); 
     })
     .catch(function(error){
       console.log("Firebase signup failed:",error);
       $scope.user.talents = [];
     });
   };


  var convertTalentsToObject = function() {
    var converted = {};
    console.log('before',$scope.user.talents);
    for (var i = 0; i < $scope.user.talents.length; i++){
      converted[$scope.user.talents[i].talent] = $scope.user.talents[i].level; 
    }
    return converted;
  };
}]);