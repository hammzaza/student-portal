const {
    Strategy: JwtStrategy,
    ExtractJwt
} = require('passport-jwt');
var config = require('../config/mongodb');
module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
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
        done(null,true);
    }));
};