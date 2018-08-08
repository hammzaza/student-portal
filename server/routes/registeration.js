var Teacher = require('../schema/teacher');
var randomstring = require("randomstring");
var jwt = require('jsonwebtoken');
var config = require('../config/mongodb');
module.exports = function(app){
    app.post('/registeration/register-teacher',function(req,res){
        teach = new Teacher();
        teach.username = randomstring.generate({length: 7,charset: 'alphabetic'});
        teach.password = teach.generateHash(randomstring.generate({length: 7,charset: 'alphabetic'}));
        teach.full_name = req.body.full_name;
        teach.teach = req.body.teacher;
        teach.phone_number = req.body.phone_number;
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

    app.post('/teacher/authenticate', function(req,res,next){
        var username = req.body.username;
        var password = req.body.password;

        Teacher.findOne({username:username},function(err,user){
            if(err)
                throw err;
            if(!user)
                return res.json({success:false,msg:'User not Found'});
            if(user.validPassword(password)){
                var token = jwt.sign(user,config.secret,{
                    expiresIn:604600
                });
                res.json({
                    success:true,
                    token:'JWT ' + token,
                    user: {
                        id: user._id,
                        full_name: user.full_name,
                        username:user.username,
                        teacher: user.teacher,
                        phone_number: user.phone_number,
                        school: user.school,
                        class: user.class
                    }
                });
            }
            else
                return res.json({success:false,msg:'Wrong Password'});
        });
    });

    app.get('/teacher/profile',passport.authenticate('jwt',{session:false}),function(req,res,next){
        res.json({teacher:req.user});
    });
};