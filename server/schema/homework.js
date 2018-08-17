var mongoose = require('mongoose');

// define the schema for our user model
var HomeWorkSchema = mongoose.Schema({
    student_name: String, //taken from student's schema,
    student_username: String, //taken from student's schema,
    class: String, // taken from student's schema since class.student = class.teacher
    date: String, // taken from req.user, //logged in teacher's class
    home_work: Boolean,
    subject: String, // selected subject
});

// create the model for users and expose it to our app
module.exports = mongoose.model('HomeWork', HomeWorkSchema);