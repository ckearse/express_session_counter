const express = require('express');
const app = express();

var session = require('express-session');
session.count = 0;

app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60000}
}));

app.get('/', function(req, res){
  console.log('request to root route');

  if(!req.session.count) req.session.count = 0;

  req.session.count += 1;

  res.render('index', {'count': req.session.count});
});

app.get('/reset', function(req, res){
  req.session.count = 0;

  res.redirect('/');
});

app.listen(7777, function(){
  console.log('Express app listening on port 7777');
});