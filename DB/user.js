var mongoose = require('mongoose');
// var bcrypt = require('bcrypt-nodejs');
var bluebird = require('bluebird');
var Request = require('./request');

// var mongoose = require('mongoose');

/*
 *    Connection stuff to help test the database connection
 */

// var url = "mongodb://banal:banal@ds031203.mongolab.com:31203/banal";

// mongoURI = url;
// mongoose.connect("mongodb://banal:banal@ds031203.mongolab.com:31203/heroku_b2mnmqj4/");

// // Run in seperate terminal window using 'mongod'
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//  console.log('Mongodb connection open');
// });
// module.exports = db;




var userSchema = mongoose.Schema({
  // name: { type: String, required: true},
  username: { type: String, required: true, index: { unique: true } },
  uid: { type: String, required: true },
  profilepic: { type: String },
  // password: { type: String },
  location: { type: String },
  email: {type: String, index: { unique: true }},
  talents: { type: Object},
  links: { type: Array }
});

var User = mongoose.model('User', userSchema);


module.exports = User;

// var patrick = new User({
//   username: "Patrick2",
//   password: "Test",
//   location: "Hawaii",
//   email: "Pavtran2@gmail.com",
//   talent: {'Piano': 2}
// })
// console.log(patrick);
// patrick.save(function(err){
//   if(err) console.log(err);
//   console.log('successful!');
// })

// (User.find(function(err, results){
//   console.log(results);
// }));