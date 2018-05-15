'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController');
  
  
  app.route('/sendloginreq')
  .post(todoList.sendLoginCredents);
  
  app.route('/sendsignupreq')
  .post(todoList.sendSignupCredents);

  app.route('/login')
  .get(todoList.loginMethod);
  app.route('/')
  .get(todoList.first_page);
  app.route('/logout')
  .post(todoList.logout);
  // todoList Routes
  app.route('/tasks')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);

app.route('/getAllUser')
    .get(todoList.list_all_users);
    
  app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);
};

