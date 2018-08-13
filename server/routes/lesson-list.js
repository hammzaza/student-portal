var LessonList = require('../schema/lesson-list');
module.exports = function (app, passport) {
    //////////////////////teacher main profile//////////////////////
    app.post('/add-lessonlist', function (req, res) {
         LessonList.create(req.body.name, function (err, post) {
             if (err) {
                 console.log(err);
                 return err;
             } else { ////////addd message code here
                 res.json({
                     message: 'Succesfully done'
                 });
             }
         });
    });
};