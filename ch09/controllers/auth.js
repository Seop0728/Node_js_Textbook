const User = require('../models/user');
const bcrypt = require('bcrypt')

/*
join.html 에서 /auth/join 으로 POST 요청
email,nick,password 정보가 req.body에 담김
*/
exports.join = async ( req, res, next ) => {
	const { email, nick, password } = req.body;
	try {
		const exUser = await User.findOne({ where : { email } });
		if ( exUser ) {
			return res.redirect('/join?error=exist')
		}

		const hash = await bcrypt.hash(password,12)
		await User.create({
			email,
			nick,
			password: hash
		})
		return res.redirect('/')
	} catch ( err ) {
		console.error(err);
		next(err);
	}

};

exports.login = () => {

};

exports.logout = () => {

};