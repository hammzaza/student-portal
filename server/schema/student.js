var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var StudentSchema = mongoose.Schema({
    username: String,
    password: String,
    name: String,
    surname: String,
    class:String,
    parent_name: String,
    phone_number: String,
    type:String
});

StudentSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

StudentSchema.methods.validPassword = function (password) {
    if (password == this.password)
        return true;
    else
        return false;
};
// create the model for users and expose it to our app
module.exports = mongoose.model('Student', StudentSchema);