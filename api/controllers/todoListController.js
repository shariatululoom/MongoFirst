'use strict';


var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks'),
  coll=mongoose.model('collections'),
  users=mongoose.model('Users');
  
  exports.first_page  = function(req, res) {
 //res.send('Hello!');
 res.sendFile('D:/skmsMongo/FirstProj'+ '/index.html')
};
 

exports.sendSignupCredents= function(req, res) {
 const username = req.body.username;
  const password = req.body.password;
  var myData = new coll({"name":username,"experience":password});
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
 const username = req.body.username;
  const password = req.body.password;
   coll.find({"name":username,"experience":password}, function(err, task) {
    if (err || task.length === 0)
	{
      res.send(err);
	  }
	  else
	  {
    res.json(task);
	console.log(`skms added:-  POST request: username is ${username} and password is ${password}`);
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

