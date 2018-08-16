var mongoose = require('mongoose');

// define the schema for our user model
var ClassListSchema = mongoose.Schema({
    name: String,
});
// create the model for users and expose it to our app
module.exports = mongoose.model('ClassList', ClassListSchema);