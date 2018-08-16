var Attendence = require('../schema/attendence');
var dateFormat = require('dateformat');
module.exports = function (app, passport) {

    //////////////////////teacher main profile//////////////////////
    app.post('/teacher/post-attendence', passport.authenticate('teacher-auth', {session: false}), function (req, res) {
        var attendences = req.body.attendences;
        ///this is the date format, should be adopted at the client side too. when switching from scores at get method according to date
        var date = dateFormat(new Date(), "dd-mmm-yyyy");
        count = 0;
        length = attendences.length;
        attendences.forEach(attendence => {
            attendence.date = date;
            Attendence.create(attendence, function (err, post) {
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
    app.get('/teacher/get-attendence/:subject', passport.authenticate('teacher-auth', {session: false}), function (req, res) {
        Attendence.find({
            class: req.user.class,
            subject: req.params.subject
        }, function (err, result) {
            res.json({
                scores: result
            });
        });
    });
};