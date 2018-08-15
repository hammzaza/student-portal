var Teacher = require('../schema/teacher');
var randomstring = require("randomstring");
const accountSid = 'xxxxxxx';
const authToken = 'xxxxx';
const client = require('twilio')(accountSid, authToken);
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
                client.messages.create({
                        body: 'Welcome to our portal as a teacher. \n Your login username: ' + teach.username + '\n Password: ' + teach.password,
                        from: 'xxx-xxxx---xxx',
                        to: teach.phone_number
                    }).then(message => res.json({
                        message: 'The login credentials have been sent to the inserted number'
                    }))
                    .done();
            }
        });
    });
};