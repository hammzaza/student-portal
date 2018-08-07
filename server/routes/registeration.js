var Teacher = require('../schema/teacher');
var randomstring = require("randomstring");
module.exports = function(app){
    app.post('/register-teacher',function(req,res){
        teacher = new Teacher();
        teacher.username = randomstring.generate({length: 7,charset: 'alphabetic'});
        teacher.password = teacher.generateHash(randomstring.generate({length: 7,charset: 'alphabetic'}));
        teacher.full_name = req.body.full_name;
        teacher.teacher = req.body.teacher;
        teacher.school = req.body.school;
        teacher.class = req.body.class;
        
    });
};

// username: String,
// password: String,
// full_name: String,
// teacher: String,
// school: String,
// class: String,