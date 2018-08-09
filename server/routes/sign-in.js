var jwt = require('jsonwebtoken');
var config = require('../config/mongodb');
var Teacher = require('../schema/teacher');
var Student = require('../schema/student');
module.exports = function(app){
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
                var token = jwt.sign(user.toJSON(), config.secret, {
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
    app.post('/parent/authenticate', function (req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        Student.findOne({
            username: username
        }, function (err, user) {
            if (err)
                throw err;
            if (!user) {
                return res.json({
                    success: false,
                    msg: 'User not Found'
                });
            }
            if (user.validPassword(password)) {
                var token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604600
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        username: user.username,
                        name: user.name,
                        surname: user.surname,
                        class: user.class,
                        parent_name: user.parent_name,
                        phone_number: user.phone_number,
                        type: user.type
                    }
                });
            } else {
                return res.json({
                    success: false,
                    msg: 'Wrong Password'
                });
            }
        });
    });

    ////---------------From Client Side, Its done there.
    // app.get('/teacher/signout',function(req,res){
    //     req.headers.authorization = null;
    //     console.log(req.headers);
    //     res.redirect('/');
    // });
};