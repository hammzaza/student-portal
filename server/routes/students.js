var Student = require('../schema/student');

module.exports = function(app,passport){
    app.get('', passport.authenticate('parent-auth', {session: false}), function (req, res) {

    });

    
};