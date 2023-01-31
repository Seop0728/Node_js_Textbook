const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { login } = require("passport/lib/http/request");

/*
join.html 에서 /auth/join 으로 POST 요청
email,nick,password 정보가 req.body에 담김
*/
exports.join = async ( req, res, next ) => {
	const { email, nick, password } = req.body;
	try {
		const exUser = await User.findOne({ where : { email } });
		if ( exUser ) {
			return res.redirect('/join?error=exist');
		}

		const hash = await bcrypt.hash(password, 12);
		await User.create({
			email,
			nick,
			password : hash
		});
		return res.redirect('/');
	} catch ( err ) {
		console.error(err);
		next(err);
	}

};

// POST /auth/login
exports.login = ( req, res, next ) => {

	// localStrategy done이 여기서 호출됩니당
	passport.authenticate('local', ( authError, user, info ) => {
		if ( authError ) {  // 서버실패
			console.error(authError);
			return next(authError);
		}

		if ( !user ) {  // 로직실패
			return res.redirect(`/?loginError=${ info.message }`);
		}

		return req.login(user, ( loginError ) => {  // 로그인 성공
			if ( loginError ) {
				console.error(loginError);
				return next(loginError);
			}
			return res.redirect('/');
		});
	})(req, res, next); // middleware 확장패턴
};

exports.logout = (req,res,next) => {
		req.logout(()=> {
			res.redirect('/');
		})
};