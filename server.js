
var express = require('express'),
 cors = require('cors'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
   cookieParser = require('cookie-parser'),
   session = require('express-session'),
   MongoStore  =       require('connect-mongo')(session),
   serveStatic = require('serve-static'),
  Task = require('./api/models/todoListModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/db'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.options('*', cors()); // include before other routes 
app.use(cors());

//*****************cookie code************
app.use(cookieParser());
//delete a cookie named "foo"
//res.clearCookie('foo');

app.use(session({
secret: 'ksdskdhskdhkhdks',
resave: false,
saveUninitialized: true,
 name: "SessionId",
  store: new MongoStore({
      url: 'mongodb://localhost/db' ,
	  ttl: 60
    }),
	cookie: { maxAge: 60000 }
}));

/*app.get('/', function(req, res){
console.log('cookie check in server.js:-  '+req.session);
   if(req.session.page_views){
   console.log('got session:-  '+req.session.Content);
      req.session.page_views++;
      res.send("You visited this page " + req.session.page_views + " times");
   } else {
      req.session.page_views = 1;
      res.send("Welcome to this page for the first time!");
   }
});
*/
//***********cookie code ends *****************
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
