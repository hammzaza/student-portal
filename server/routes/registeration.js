var Teacher = require('../schema/teacher');
var randomstring = require("randomstring");
module.exports = function(app){
    app.post('/register-teacher',function(req,res){
        teach = new Teacher();
        teach.username = randomstring.generate({length: 7,charset: 'alphabetic'});
        teach.password = teach.generateHash(randomstring.generate({length: 7,charset: 'alphabetic'}));
        teach.full_name = req.body.full_name;
        teach.teach = req.body.teacher;
        teach.school = req.body.school;
        teach.class = req.body.class;
        Teacher.create(teach, function (err, post) {
            if (err) {
                console.log(err);
                return err;
            }
            else{
                ////////addd message code here
                res.json(post);
            }
             
         });
    });
};