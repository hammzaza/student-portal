var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var mongoose = require('mongoose');
var config = require('./server/config/mongodb');
var app = express();
var passport = require('passport');
var port = process.env.port || 8080;
mongoose.connect(config.url);

mongoose.connection.on('connected',function(){
    console.log('Connected to Database');
});
mongoose.connection.on('error', function (err) {
    console.log('Database Error: ', err);
});
//app.set('views', path.join(__dirname, 'dist/projectname'));

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
//app.use(express.static(path.join(__dirname, 'dist/projectname')));
require('./server/config/passport')();
require('./server/routes/register-parent')(app);
require('./server/routes/register-teacher')(app);
require('./server/routes/sign-in')(app);
require('./server/routes/teacher')(app,passport);
require('./server/routes/students')(app, passport);
require('./server/routes/score')(app, passport);
// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'dist/projectname/index.html'));
// });

app.get('/',function(req,res){
    res.send({message:"Hello world"});
});

app.listen(port, function () {
    console.log('App is listening to port : ' + port);
});
