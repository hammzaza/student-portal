var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var TeacherSchema = mongoose.Schema({
    username: String,
    password: String,
    full_name: String,
    teacher: String,
    phone_number:String,
    school: String,
    class: String,
    type: String,
});

TeacherSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

TeacherSchema.methods.validPassword = function (password) {
    if(password == this.password)
        return true;
    else
        return false;
};
// create the model for users and expose it to our app
module.exports = mongoose.model('Teacher', TeacherSchema);