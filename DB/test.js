var dbparse = require('./dbparser');
var User = require('./user.js');
/**
 * Testing
**/
// removeUser('Johndoe');

var Johndoe =  {
  name: "John Doe",
  username: "Johndoe",
  password: "Johndoe",
  location: "Oakland",
  uid: "0123ABC",
  email: "JohnDoe@gmail.com"
};

// console.log(patrick);
// addUser(Johndoe, function(results){
//   console.log(results);
// });

var talents = {
  'Piano': 5,
  'Guitar': 7,
  'Trumpet': 5
};

User.findOne({uid: '01234ABC'}, function(err, results){
  console.log(err, results);
});
// 
// addTalents('Johndoe', talents);
// removeUser({'username': 'Patrick'});

// (User.find(function(err, results){
//   console.log(results);
// }));

// var request = new Request({
//   requester: "Patrick",
//   talents: {'Piano': 4},
//   location: 'Oakland'
// })

// request.save(function(err){
//   if(err) console.log(err);
//   console.log('successful!');
// })

// Request.find(function(err, results){
//   console.log(results);
// })

// getReqTalents('Fwewetlute', function(results){
//   console.log("People who can play the Piano" + results);
// });

// var requestOne;
// // Request.findOne(function(err, results){
// //   requestOne = results;
// //   console.log(requestOne);
// //   parseReq(requestOne, function(results){
// //     console.log("People who meet the request criteria" + results);
// //   })

// // });
// // console.log(requestOne);
// // parseReq(requestOne, function(results){
// //   console.log("People who meet the request criteria" + results);
// // })
// dbparse.getRequests(function(result){
//   console.log(result);
// })

// User.find(function(err, results){
//   console.log(results);
// })

// dbparse.getUID("simplelogin:19", function(results){
//   // if(err) console.log(err);
//   console.log(results);
// })

// dbparse.getUIDRequests("01234ABC", function(results){
//   console.log(results);
// })

/**********************************
 Testing Events
 **********************************/

var Event1 = {
  name: "School of Rock",
  description: "Rock your socks out",
  location: "School",
  uid: "0123ABC",
  hashtag: "#rockout",
  users: ["Bobby", "Jack", "Black"]
};

// dbparse.addEvent(Event1, function(results){
//   console.log(results);
// });

// dbparse.getEvents(function(results){
//   console.log(results);
// });

// dbparse.getRequests(function(results){
//   console.log(results);
// })

// dbparse.getUIDEvents('0123ABC', function(results){
//   console.log(results);
// })
