'use strict'
var express = require('express');
var session = require('express-session');
var router = express.Router();

router.get('/', function (req, res) {
    if (req.cookies.loggedin == "true") {
		res.send('Welcome back, ' + req.cookies.username + '!');
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});

module.exports = router;
