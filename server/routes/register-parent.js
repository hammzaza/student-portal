var Student = require('../schema/student');
var randomstring = require("randomstring");
const accountSid = 'ACcb2f5a1f015bc8c32cab79dc64d4e0da';
const authToken = '290489449859120de072ed33b6f04d72';

const client = require('twilio')(accountSid, authToken);
module.exports = function(app,passport){
    app.post('/registeration/register-student', passport.authenticate('teacher-auth', {session: false}), function (req, res) {
        par = new Student();
        par.username = req.body.phone_number;
        par.password = randomstring.generate({length: 7,charset: 'alphabetic'});
        par.name = req.body.name;
        par.surname = req.body.surname;
        par.parent_name = req.body.parent_name;
        par.phone_number = req.body.phone_number;
        par.class = req.user.class; //the teacher's credentials are saved in req.user through jwt auth.
        par.type = 'Student';
        Student.create(par, function (err, post) {
            if (err) { 
                console.log(err);
                return err;
            } 
            else {////////addd message code here
                client.messages
                    .create({
                        body: 'Welcome to our portal as a parent. \n Your login username: '+ par.username + '\n Password: ' + par.password,
                        from: 'xxx-xxxx---xxx',
                        to: par.phone_number
                    }).then(message => res.json({message: 'The login credentials have been sent to the inserted number'}))
                    .done();
                
            }
        });
    });
};





