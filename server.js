var express = require('express'),
 cors = require('cors'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/db'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.options('*', cors()); // include before other routes 
app.use(cors());


/*app.post('/sendloginreq', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(`POST request: username is ${username} and password is ${password}`);
  res.end(`You are now logged in Mr(s) ${username}`);
});
*/
var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
/*app.get('/simple-cors', cors(), function(req, res){
  res.json({
    text: 'Simple CORS requests are working. [GET]'
  });
});*/
