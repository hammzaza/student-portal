var HomeWork = require('../schema/HomeWork');
var dateFormat = require('dateformat');
module.exports = function (app, passport) {

    //////////////////////teacher main profile//////////////////////
    app.post('/teacher/post-homework', passport.authenticate('teacher-auth', {
        session: false
    }), function (req, res) {
        var HomeWorks = req.body.HomeWorks;
        ///this is the date format, should be adopted at the client side too. when switching from scores at get method according to date
        var date = dateFormat(new Date(), "dd-mmm-yyyy");
        count = 0;
        length = HomeWorks.length;
        HomeWorks.forEach(HomeWork => {
            HomeWork.date = date;
            Attendance.create(HomeWork, function (err, post) {
                if (err) {
                    console.log(err);
                    return err;
                } else {
                    count++;
                }
                if (length == count) {
                    res.json({
                        message: 'Succesfully Done'
                    });
                }
            });
        });
    });
    app.get('/teacher/get-homework/:subject', passport.authenticate('teacher-auth', {
        session: false
    }), function (req, res) {
        HomeWork.find({
            class: req.user.class,
            subject: req.params.subject
        }, function (err, result) {
            res.json({
                scores: result
            });
        });
    });
};