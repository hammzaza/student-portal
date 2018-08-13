var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var LessonSchema = mongoose.Schema({
    name: String,
    teacher:String,
    class:String
});
// create the model for users and expose it to our app
module.exports = mongoose.model('Lesson', LessonSchema);