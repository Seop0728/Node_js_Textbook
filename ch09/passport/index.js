const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaogStrategy');
const User = require('../models/user');

module.exports = () => {
	passport.serializeUser(( user, done ) => {  // user === exUser
		console.log('serialize');
		done(null, user.id);
		// { 세션쿠키 : 유저아이디 } -> 메모리에 저장
	});

	passport.deserializeUser(( id, done ) => {
		User.findOne({ where : { id } })
			.then(user => {
				console.log('user', user);
				done(null, user);
			})
			.catch(err => done(err));
	});
	local();
	kakao();
};