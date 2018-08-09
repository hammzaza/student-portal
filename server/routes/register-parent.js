var Student = require('../schema/student');
var randomstring = require("randomstring");
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
                res.json({
                    message: 'The login credentials have been sent to the inserted number'
                });
            }
        });
    });
};