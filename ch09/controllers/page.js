exports.renderProfile = (req,res,next) => {
	res.render('profile', {title: '내 정보 - NodeBird'})
}

exports.renderJoin = (req,res,next) => {
	res.render('join',{title: '내 정보 - NodeBird'})
}

exports.renderMain = ( req, res, next ) => {
	res.render('main', {
		title : 'seop',
		twits : [],
	})
};

// 라우터 -> 컨트롤러 -> 서비스
//컨트롤러 = 요청과 응답을 알아먹음
//서비스 = 요청과 응답을 모름