var Teacher = require('../schema/teacher');
var Lesson = require('../schema/lesson');
module.exports = function (app, passport) {
    //////////////////////teacher main profile//////////////////////
    app.post('/teacher/post-lesson', passport.authenticate('teacher-auth', {session: false}), function (req, res) {
        les = new Lesson();
        les.name = req.body.name;
        les.teacher = req.user.phone_number;
        les.class = req.user.class;
        Lesson.create(les, function (err, post) {
            if (err) {
                console.log(err);
                return err;
            } else { ////////addd message code here
                res.json({
                    message: 'Succesfully done'
                });
            }
        });
    });
    app.get('/teacher/get-lesson', passport.authenticate('teacher-auth', {session: false}), function (req, res) {
        Lesson.find({teacher:req.user.phone_number,class:req.user.class},function(err,result){
            res.json({lessons:result})
        });
    });

};