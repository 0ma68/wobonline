'use strict'
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../db/connection.js');

//var urlencodedParser = bodyParser.urlencoded({extended: false});

/* GET Login Page */
router.get('/', function (req, res) {
    res.render('login', { title: 'Login | Work of balance'});
});

/*router.post('/auth', function (req, res) {
   // var username = req.body.username;
   // var password = req.body.password;

    console.log(req.body.username);
    console.log(req.body);

    if (username && password) {
        db.get('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(err, row) {
            if(err) {
                throw err;
            }
            if (row) {
                console.log('user ' + req.body.username + ' has logged in.');
                req.session.loggedin = true;
				req.session.username = username;
				req.redirect('/admin');
            }
        });

    } else {
        res.send("Bitte geben Sie ein gültigen Benutzernamen sowie ein gültiges Passwort ein!");
        res.end();
    }
    return ;
});*/

module.exports = router;

