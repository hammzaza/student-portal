var Student = require('../schema/student');
var Active = require('../schema/active');
var Attendence = require('../schema/attendence');
var HomeWork = require('../schema/homework');
var StudentScore = require('../schema/student-score');
module.exports = function(app,passport){
    app.get('/parent/get-active', passport.authenticate('parent-auth', { session: false }), function (req, res) {
        Active.find({
            student_username: req.user.username}, function (err, result) {
            res.json({
                active: result
            });
        });
    });
    app.get('/parent/get-attendance', passport.authenticate('parent-auth', { session: false }), function (req, res) {
        Attendence.find({
            student_username: req.user.username
        }, function (err, result) {
            res.json({
                attendence: result
            });
        });
    });
    app.get('/parent/get-studentScore', passport.authenticate('parent-auth', { session: false }), function (req, res) {
        StudentScore.find({
            student_username: req.user.username
        }, function (err, result) {
            res.json({
                student_score: result
            });
        });
    });
    app.get('/parent/get-homework', passport.authenticate('parent-auth', { session: false }), function (req, res) {
        HomeWork.find({
            student_username: req.user.username
        }, function (err, result) {
            res.json({
                homework: result
            });
        });
    });

    
};