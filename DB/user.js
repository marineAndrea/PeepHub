var mongoose = require('mongoose');
var Request = require('./request');

var userSchema = mongoose.Schema({
  // name: { type: String, required: true},
  username: { type: String, required: true },
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
