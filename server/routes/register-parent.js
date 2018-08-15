var Student = require('../schema/student');
var randomstring = require("randomstring");
const accountSid = 'xxxxxxxxx';
const authToken = 'xxxxxxxxxxxxx';
const client = require('twilio')(accountSid, authToken);
module.exports = function(app){
    app.post('/registeration/register-student', function (req, res) {
        par = new Student();
        par.username = req.body.phone_number;
        par.password = randomstring.generate({length: 7,charset: 'alphabetic'});
        par.name = req.body.name;
        par.surname = req.body.surname;
        par.parent_name = req.body.parent_name;
        par.phone_number = req.body.phone_number;
        par.class = req.body.class; //input type hidden. value set to teacher.class.
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





