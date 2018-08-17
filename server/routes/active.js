var Active = require('../schema/active');
var dateFormat = require('dateformat');
module.exports = function (app, passport) {

    //////////////////////teacher main profile//////////////////////
    app.post('/teacher/post-active', passport.authenticate('teacher-auth', {
        session: false
    }), function (req, res) {
        var actives = req.body.actives;
        ///this is the date format, should be adopted at the client side too. when switching from scores at get method according to date
        var date = dateFormat(new Date(), "dd-mmm-yyyy");
        count = 0;
        length = actives.length;
        actives.forEach(active => {
            active.date = date;
            Attendance.create(active, function (err, post) {
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
    app.get('/teacher/get-active/:subject', passport.authenticate('teacher-auth', {
        session: false
    }), function (req, res) {
        Active.find({
            class: req.user.class,
            subject: req.params.subject
        }, function (err, result) {
            res.json({
                scores: result
            });
        });
    });
};