var StudentScore = require('../schema/student-score');
var dateFormat = require('dateformat');
module.exports = function (app, passport) {

    //////////////////////teacher main profile//////////////////////
    app.post('/teacher/post-scores', passport.authenticate('teacher-auth', {session:false}), function (req, res) {
        var scores = req.body.scores;
        ///this is the date format, should be adopted at the client side too. when switching from scores at get method according to date
        var date = dateFormat(new Date(), "dd-mmm-yyyy");
        count = 0;
        length = scores.length;
        scores.forEach(score => {
            score.date = date;
            StudentScore.create(score, function (err, post) {
                if (err) {
                    console.log(err);
                    return err;
                } 
                else {
                    count++;
                }
                if (length == count) {
                    res.json({message: 'Succesfully Done'});
                }
            });
        }); 
    });
    app.get('/teacher/get-scores', passport.authenticate('teacher-auth', {session: false}), function (req, res) {
        StudentScore.find({
            class: req.user.class
        }, function (err, result) {
            res.json({scores: result});
        });
    });
};