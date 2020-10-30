'use strict';
var express = require('express');
var router = express.Router();
var db = require('../db/connection.js');

var videoTitles = [];

db.each('SELECT title FROM videos', [], (err, result) => {

    if (err) {
        throw err;
      }
    videoTitles.push(result.title);
});

// GET Home
router.get('/', function (req, res) {
    res.render('index', { title: 'Online Training | Work of balance', videoTitles});
});

module.exports = router;


