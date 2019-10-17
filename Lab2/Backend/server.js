const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');


let dbPool = require('./src/dao/ConnectionPooling');
let signUpLogin = require('./src/routes/signUpLogin');
let profile=require('./src/routes/profile');
let orders=require('./src/routes/orders');
let menu=require('./src/routes/menu');
let buyer=require('./src/routes/buyer');
const app = express();
//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

allowCrossDomain=(req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'lab1_grubhub_simulation',
  resave: false, 
  saveUninitialized: false, 
  duration: 60 * 60 * 1000,    
  activeDuration: 5 * 60 * 1000
}));
app.use(allowCrossDomain);


app.use('/', signUpLogin);
app.use('/', profile);
app.use('/', orders);
app.use('/', menu);
app.use('/',buyer);
const port = 5000;

app.listen(port, () => `Server running on port ${port}`);