'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});
var TaskSchema2 = new Schema({
  "name": {
    type: String,
	required: true
  
  },
 
 "experience": {
    type: String,
	required:true
    
  },
   
  
});
var TaskSchema3 = new Schema({
  "username": {
    type: String,
  
  },
 
 "password": {
    type: String,
    
  },
   
  
});
var userDBSchema = new Schema({
FirstName: {type: String, trim: true,sparse: true, required: true},
LastName: {type: String, trim: true,sparse: true, required: true},
Email : {type: String, trim: true, index: true, unique: true, sparse: true, required: true},
PasswordHash:{type: String},
PasswordSalt:{type: String},
Country : {type: String, trim: true},
State : {type: String, trim: true},
ContributeIn : {type: Array, trim: true, },
LearnIn : {type: Array, trim: true, },
Coins : {type: Number},
DOB : {type:Date},

});
module.exports = mongoose.model('myUserDatabase', userDBSchema);
module.exports = mongoose.model('Tasks', TaskSchema);
module.exports = mongoose.model('Users', TaskSchema3);
module.exports = mongoose.model('collections', TaskSchema2);