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
  
  },
 
 "experience": {
    type: String,
    
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

module.exports = mongoose.model('Tasks', TaskSchema);
module.exports = mongoose.model('Users', TaskSchema3);
module.exports = mongoose.model('collections', TaskSchema2);