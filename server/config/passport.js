const {
    Strategy: JwtStrategy,
    ExtractJwt
} = require('passport-jwt');

var Teacher = require('../schema/teacher');
var config = require('../config/mongodb');
module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use('teacher-auth',new JwtStrategy(opts, function (jwt_payload, done) {
        Teacher.findById(jwt_payload.id,function(err,obj){
            if (err)
                return done(err,false);
            if(user)
                return done(null,user);
            else
                return done(null,false);
        });
    }));
    passport.use('parent-auth', new JwtStrategy(opts, function (jwt_payload, done) {
        // User.findOne({
        //     id: jwt_payload.id
        // }, function (err, user) {
        //     if (err)
        //         return done(err, false);
        //     if (user)
        //         done(null, user);
        //     else
        //         done(null, false);
        // });
        done(null, true);
    }));
};