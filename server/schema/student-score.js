var mongoose = require('mongoose');

// define the schema for our user model
var StudentScoreSchema = mongoose.Schema({
    student_name: String, //taken from student's schema,
    student_username: String, //taken from student's schema,
    class: String, // taken from student's schema since class.student = class.teacher
    date: String, // dd-mmm-yyyy
    score: Number, //1-5
    subject: String, // selected subject
});
// create the model for users and expose it to our app
module.exports = mongoose.model('StudentScore', StudentScoreSchema);