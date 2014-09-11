var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var sys = require('sys');

var app     = express();
var port    = process.env.PORT || 3000;

app.set('view engine', 'jade');

app.get('/', function(req, res) {
    var now = new Date();
    res.render('index', {
        title   : 'File upload',
        year    : now.getFullYear(),
        month   : now.getMonth()
    });
});

app.post('/:year/:month', function (req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = './uploads';
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files){
        console.log('in if condition ' + sys.inspect({fields: fields, files: files}));
        if (err) return res.redirect(303, '/error');
    });
    res.redirect(303, '/thank-you');
});

app.get('/thank-you', function(req, res) {
    res.send('Tnank you!');
});

app.get('/error', function(req, res) {
    res.send('Oops! Error!');
});

app.listen(port);
console.log('The magic happens on port ' + port);