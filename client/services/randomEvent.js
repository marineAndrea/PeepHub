angular.module('app.randomEvent',[])
.factory('randomEvent', ['HttpRequests', function(HttpRequests){
  var users;

  HttpRequests.getAllUsers()
    .then(function(err, result){
      users = result;
    }); // TODO: add this method to httpRequests

  var venues = [{
    location:"The Independent", 
    neighborhood: "Western Addition",
    address: '628 Divisadero Street',
  },{
    location: "Dr. Teeth", 
    neighborhood: "Mission",
    address: '2300 Mission Street',
  }, { 
    location: "Bimbo's 365", 
    neighborhood: "North Beach",
    address: '1025 Columbus Street',
  }, {location: "Brick and Morter", 
    neighborhood: "The Mission",
    address: '1710 Mission Street',
  }, {
    location:"The Fillmore", 
    neighborhood: "Western Addition",
    address: '1805 Geary Blvd',
  }, {
    location:"SFJazz", 
    neighborhood: "Hayes Valley",
    address: '102 Franklin Street',
  }, {
    location:"Great American Music Hall", 
    neighborhood: "Hayes Valley",
    address: "859 O'Farrell Street"
  },{
    location:"The Warfield", 
    neighborhood: "Downtown",
    address: '982 Market Street',
  }, {
    location:"1015 Folsom", 
    neighborhood: "SOMA",
    address: '1015 Folsom Street',
  }, {
    location:"Ruby Skye", 
    neighborhood: "Downtown",
    address: '420 Mason Street',
  }];

  var eventNameAdjs = ['Gargantuan', 'Miniscule', 'Heroic', 'Unphased', 'Utilitarian', 'Tijuana', 'Dastardly', 'Opulent', 'Cunning', 'Angry', 'Blue Suede', 'Cantankerous', 'Disinvolved', 'Ergonomic', 'Feted', 'Gregarious', 'Hollow', 'Itsy', 'Jammin', 'Karate', 'Lackadaisical', 'Moombahton', 'Negative', 'Opinionated', 'Practical'];

  var eventNameNouns = [ 'Argonauts', 'Ballister', 'Cranks', 'Dipthongs','Elephants', 'Fools', 'Gentlemen', 'Hanks', 'Gamblers'];

  var hashtags = ['jazz', 'rock', 'punk', 'moombahton', 'party', 'reggae', 'vibes', 'country', 'bluegrass', 'rap', 'hip-hop', 'surfrock', 'classical', 'romantic', 'r&b', 'smooth', 'chillaxed','downtempo', 'edm', 'adjsavedmylife','freebird','salsa', 'putonyourdancingshoes', 'ternt', 'trap', 'house music', 'trancefamily', 'brass', '2turntablesandamicrophone', 'rock', 'country', 'hip-hop', 'r&b', 'punk', 'goth', 'screamo', 'rockabilly', 'folk', 'reggae'];

  var pickRandom = function(array) {
    return array[Math.floor(Math.random*array.length)];
  };

  return function() {
    var location = pickRandom(venues);
    var randomEvent = {
      name: pickRandom(eventNameAdjs) + ' ' + pickRandom(eventNameNouns),
      description: "awesome description here",
      location: location.location,
      neighborhood: location.neighborhood,
      address: location.address,
      uid: pickRandom(users.uid)
    };

    return randomEvent;
  }
}]);












