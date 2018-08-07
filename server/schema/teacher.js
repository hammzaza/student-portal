var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var TeacherSchema = mongoose.Schema({
    username: String,
    password: String,
    full_name: String,
    teacher: String,
    school: String,
    class: String,
});

TeacherSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

TeacherSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Teacher', TeacherSchema);