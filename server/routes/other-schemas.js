var LessonList = require('../schema/lesson-list');
var ClassList = require('../schema/classlist');
var SchoolList = require('../schema/school-list');
module.exports = function (app) {
    app.post('/add-lessonlist', function (req, res) {
         LessonList.create(req.body.name, function (err, post) {
             if (err) {
                 console.log(err);
                 return err;
             } else { 
                 res.json({
                     message: 'Succesfully done'
                 });
             }
         });
    });
    app.post('/add-schoollist', function (req, res) {
        SchoolList.create(req.body.name, function (err, post) {
            if (err) {
                console.log(err);
                return err;
            } else { 
                res.json({
                    message: 'Succesfully done'
                });
            }
        });
    });
    app.post('/add-classlist', function (req, res) {
        ClassList.create(req.body.name, function (err, post) {
            if (err) {
                console.log(err);
                return err;
            } else { 
                res.json({
                    message: 'Succesfully done'
                });
            }
        });
    });

    app.get('/get-lessonlist', function (req, res) {
        LessonList.find({}, function (err, result) {
            res.json({
                lessons: result
            });
        });
    });
    app.get('/get-schoollist', function (req, res) {
        Lesson.find({}, function (err, result) {
            res.json({
                lessons: result
            })
        });
    });
    app.get('/get-classlist', function (req, res) {
        ClassList.find({}, function (err, result) {
            res.json({
                lessons: result
            })
        });
    });
};