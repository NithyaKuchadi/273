const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
var config = require('./config/settings');
let signUpLogin = require('./src/routes/signUpLogin');
let profile=require('./src/routes/profile');
let orders=require('./src/routes/orders');
let menu=require('./src/routes/menu');
let buyer=require('./src/routes/buyer');
let inbox=require('./src/routes/inbox');
let mongoose=require('mongoose');
var config = require('./config/settings');
var passport = require('passport');
var MongoStore = require('connect-mongo')(session);

const app = express();

app.use(passport.initialize());

// Bring in defined Passport Strategy
require('./config/passport').passport;
let connStr = "mongodb+srv://admin:pass@Lab2MongoDB-hwmpr.mongodb.net/Lab2MongoDB?retryWrites=true&w=majority";
mongoose.connect(connStr,{ useNewUrlParser: true, poolSize: 10}, function(err){
 if(err)
  throw err;
 else
  console.log("Successfully connected to MongoDB");
});
//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://'+config.client+':3000', credentials: true }));



allowCrossDomain=(req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', 'http://'+config.client+':3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(config.connection_string, { useNewUrlParser: true, poolSize: 10 }, function (err) {
  if (err) throw err;
  else {
      console.log('Successfully connected to MongoDB');
  }
});

app.use(session({
  secret: 'lab1_grubhub_simulation',
  resave: false, 
  saveUninitialized: false, 
  store: new MongoStore({ mongooseConnection : mongoose.connection })
}));
app.use(allowCrossDomain);
app.use(function(req,res,next){
  res.locals.session=req.session;
  next();
})

app.use('/', signUpLogin);
app.use('/', profile);
app.use('/', orders);
app.use('/', menu);
app.use('/',buyer);
app.use('/', inbox);
inbox
const port = 5000;

app.listen(port, () => `Server running on port ${port}`);