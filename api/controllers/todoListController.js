'use strict';


var mongoose = require('mongoose'),
cors = require('cors'),
  Task = mongoose.model('Tasks'),
  coll=mongoose.model('collections'),
  users=mongoose.model('Users'),
  userDB=mongoose.model('myUserDatabase'),
  express = require('express'),
  app = express(),
  cookieParser = require('cookie-parser'),
   session = require('express-session'),
    bodyParser = require('body-parser'),
   MongoStore  =       require('connect-mongo')(session);
 

var sess;

 
  exports.first_page  = function(req, res) {
 console.log('got session:-  '+req.session.username);
 if(req.session.username)
 {
  res.sendFile('D:/skmsMongo/FirstProj'+ '/home.html');
  }
  else
  {
  res.sendFile('D:/skmsMongo/FirstProj'+ '/index.html');
  }
 //res.sendFile('D:/skmsMongo/FirstProj'+ '/index.html')
};
 

exports.sendSignupCredents= function(req, res) {
var salt;var passwordData;
//hashing and salting the password:-  
var crypto = require('crypto');
const username = req.body.username;
  const password = req.body.password;
  const dob = req.body.dob;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const country = req.body.country;
  const state = req.body.state;
  console.log(username+dob+lastName+lastName+state);
  
/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

function saltHashPassword(userpassword) {
    salt = genRandomString(16); /** Gives us salt of length 16 */
     passwordData = sha512(userpassword, salt);
    console.log('UserPassword = '+userpassword);
    console.log('Passwordhash = '+passwordData.passwordHash);
    console.log('nSalt = '+passwordData.salt);
}

saltHashPassword(password);

console.log('Hashed pwd:-  '+password);
 
  var myData = new userDB({FirstName:firstName,LastName:lastName,Email:username,"PasswordHash":passwordData.passwordHash,"PasswordSalt":passwordData.salt,Country:country,State:state,DOB:dob});
  myData.save(function(err, task) {
    if (err || task.length === 0)
	{
      res.send(err);
	  }
	  else
	  {
    res.json(task);
	console.log(`skms added:-  POST request: username is ${username} and password is ${password}`);
  res.end(`Inserted ${username}`);
  }
  
  });
  /* coll.save([{"name":username,"experience":password}], function(err, task) {
    if (err || task.length === 0)
	{
      res.send(err);
	  }
	  else
	  {
    res.json(task);
	console.log(`skms added:-  POST request: username is ${username} and password is ${password}`);
  res.end(`Inserted ${username}`);
  }
  
  });*/
  
};
  
  
  exports.sendLoginCredents = function(req, res) {
  console.log('inside log :-  '+req.session.token);
  //req.session.user123=123;
  //console.log('session stored:-  '+req.session.user123);
 // req.session.destroy(function(){
   ////   console.log("user logged out.")
   //});
   //res.redirect('/login');
  //print cookies recived from browser
  console.log('Cookies: ', req.cookies);
  ////Expires after 36000 ms from the time it is set.
  //res.cookie('LoginCookie', 'sessionID',{maxAge: 36000});
 const username = req.body.username;
  const password = req.body.password;
   userDB.find({Email:username}, function(err, task) {
    if (err || task.length === 0)
	{
      res.send(err);
	  }
	  else
	  {
	  //rehash obtained password:- 
	  var salt;var passwordData;  
var crypto = require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

function saltHashPassword(userpassword) {
    salt = task[0].PasswordSalt;//genRandomString(16); /** Gives us salt of length 16 */
     passwordData = sha512(userpassword, salt);
   
}

saltHashPassword(password);
	  console.log('Found Hash:-  '+task[0].PasswordHash);
	  console.log('Regenerated hash:-  '+passwordData.passwordHash);
	  if(task[0].PasswordHash ===passwordData.passwordHash)
	  {
	  console.log('cookie set');
	  req.session.username=username;
	  //req.session('name', 'express');
	  //res.redirect('/home.html'); 
   res.json(task);
	}
	else
	{
	res.send(err);
	}
	//console.log(`skms added:-  POST request: username is ${username} and password is ${password}`);
  res.end(`You are now logged in Mr(s) ${username}`);
  }
  
  });
  
};
  
  exports.loginMethod = function(req, res) {
  users.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.list_all_users = function(req, res) {
  coll.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

