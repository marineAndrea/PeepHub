var mongoose = require('mongoose');
var bluebird = require('bluebird');
var User = require('./user');

var requestSchema = mongoose.Schema({
  // requester: { type: String },
  uid: {type: String },
  talent: { type: Object },
  location: { type: String },
  level: {type: String},
  active: { type: Boolean, required: true , default: true}
});

var Request = mongoose.model('Request', requestSchema);

requestSchema.pre('save', function(next){
  console.log(this);
  next();
});


module.exports = Request;
