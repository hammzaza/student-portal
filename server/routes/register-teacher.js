var Teacher = require('../schema/teacher');
var randomstring = require("randomstring");
module.exports = function (app, passport) {
    app.post('/registeration/register-teacher', function (req, res) {
        teach = new Teacher();
        teach.username = req.body.phone_number;
        teach.password = randomstring.generate({
            length: 7,
            charset: 'alphabetic'
        });
        teach.full_name = req.body.full_name;
        teach.teacher = req.body.teacher;
        teach.phone_number = req.body.phone_number;
        teach.school = req.body.school;
        teach.class = req.body.class;
        teach.type = 'Teacher';
        Teacher.create(teach, function (err, post) {
            if (err) {
                console.log(err);
                return err;
            } else {
                ////////addd message code here
                res.json({
                    message: 'TThe login credentials have been sent to the inserted number'
                });
            }
        });
    });
};