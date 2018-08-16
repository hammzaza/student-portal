var Teacher = require('../schema/teacher');
const accountSid = 'xxxxxxx';
const authToken = 'xxxxx';
const client = require('twilio')(accountSid, authToken);
module.exports = function(app,passport){
    //////////////////////teacher main profile//////////////////////
    app.get('/teacher/profile', passport.authenticate('teacher-auth', {session: false}), function (req, res) {
        res.json({
            teacher: req.user
        });
    });
    app.put('/teacher/edit-student/:id', passport.authenticate('teacher-auth', {session: false}), function (req, res) {
        var id = req.params.id;
        Student.findOneAndUpdate({
            "_id": id
        }, {
            "$set": {
                "name": req.body.name,
                "surname": req.body.surname,
                "parent_name": req.body.parent_name,
                "phone_number": req.body.phone_number
            }
        }).exec(function (err, result) {
            if (err) {
                throw err;
            } else {
                client.messages.create({
                        body: 'Your login credentials have been changed\n Login: '+ req.body.phone_number + ' with the same password',
                        from: 'xxx-xxxx---xxx',
                        to: req.body.phone_number
                    }).then(message => res.json({
                        message: 'Succesfully done'
                    }))
                    .done();
                res.json(result);
            }
        });
    });


    //////////////////////////////////////delete-student/////////////////////////////


    app.delete('/teacher/delete-student/:id', passport.authenticate('teacher-auth', {session: false}), function (req, res) {
        id = req.params.id;
        Student.deleteOne({
            "_id": id
        }, function (err) {

        });

        Student.findByIdAndRemove(req.params.id, function (err, post) {
            if (err) {
                res.json({
                    message: "Something is wrong with the server"
                });
            } else {
                res.json({
                    message: "Removed Succesfully"
                });
            }
        });
    });
    
};