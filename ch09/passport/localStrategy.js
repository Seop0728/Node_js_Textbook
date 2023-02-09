const passport = require('passport');
const { Strategy : LocalStrategy } = require('passport-local');
const User = require('../models/user');
const bcrypt = require('bcrypt');
console.log(User);

module.exports = () => {
	passport.use(new LocalStrategy({
		usernameField : 'email',  // req.body.email
		passwordField : 'password', // req.body.password
		passReqToCallback : false  // true면 async ( req,email... req 추가하면댐)
	}, async ( email, password, done ) => { // done(서버실패, 성공유저, 로직실패)
		try {
			const exUser = await User.findOne({ where : { email } });
			if ( exUser ) {
				const result = await bcrypt.compare(password, exUser.password);
				if ( result ) {
					done(null, exUser);  // 성공유저
				} else {
					done(null, false, { message : '비밀번호가 일치하지않습니당.' });  // 로직 실패
				}

			} else {
				done(null, false, { message : '회원가입 먼저 해주세용' });
			}

		} catch ( err ) {
			console.error(err);
			done(err); // 서버실패
		}
	}));

};