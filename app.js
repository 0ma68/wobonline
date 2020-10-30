'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var db = require('./db/connection');

var app = express();

//use session cookie
app.use(session({
    secret: 'Rp5WWf4WNqS)!MS',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))



// uncomment after placing favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var index = require('./routes/index');
var login = require('./routes/login');
var admin = require('./routes/admin');

// Use Routes
app.use('/', login);
app.use('/index', index);
app.use('/admin', admin);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.post('/auth', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    //console.log(req.body);
 
    if (username && password) {
        db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(err, row) {
            if(err) {
                throw err;
            }
            if (row) {
                console.log('user ' + req.body.username + ' has logged in.');
                res.cookie('loggedin', 'true');
                res.cookie('username', username);
                res.redirect('/index');
            }
        });
 
    } else {
        res.send("Bitte geben Sie ein gültigen Benutzernamen sowie ein gültiges Passwort ein!");
        res.end();
    }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});


