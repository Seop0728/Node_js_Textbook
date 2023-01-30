const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaogStrategy');
const User = require('../models/user');

module.exports = () => {
	passport.serializeUser(( user, done ) => {
		done(null, user.id);
	});

	passport.deserializeUser((id,done) => {
		User.findOne({ where: {id} })
			.then(( user:User ) => done(null, user))
			.catch(err => done(err))
	})
};