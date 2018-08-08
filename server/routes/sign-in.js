var jwt = require('jsonwebtoken');
var config = require('../config/mongodb');
module.exports = function(app,passport){
    app.post('/teacher/authenticate', function (req, res, next) {
        var username = req.body.username;
        var password = req.body.password;

        Teacher.findOne({username: username}, function (err, user) {
            if (err)
                throw err;
            if (!user){
                return res.json({
                    success: false,
                    msg: 'User not Found'
                });
            }
            if (user.validPassword(password)) {
                var token = jwt.sign(user, config.secret, {
                    expiresIn: 604600
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        full_name: user.full_name,
                        username: user.username,
                        teacher: user.teacher,
                        phone_number: user.phone_number,
                        school: user.school,
                        class: user.class,
                        type: user.type
                    }
                });
            } 
            else{
                return res.json({
                    success: false,
                    msg: 'Wrong Password'
                });
            }
        });
    });

    app.get('/teacher/profile', passport.authenticate('teacher-auth', { session: false }), function (req, res, next) {
        if (req.user.type == 'Teacher')
            res.json({
                teacher: req.user
            });
        else
            throw err;
    });
};