var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var StudentScoreSchema = mongoose.Schema({
    student_name:String, //taken from student's schema,
    student_username: String, //taken from student's schema,
    class: String, // taken from req.user, //logged in teacher's class
    date: String, // dd-mmm-yyyy
    score: Number, //1-5
});

// create the model for users and expose it to our app
module.exports = mongoose.model('StudentScore', StudentScoreSchema);