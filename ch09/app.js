const express = require('express');
const cookieParser = require('cookie-parser'); // 쿠키사용
const morgan = require('morgan'); // 요청과 응답을 위한
const path = require('path'); // node 내장모듈
const session = require('express-session'); // 로그인에 세션을 사용하기 위한
const nunjucks = require('nunjucks'); // 화면 그리기 위한
const dotenv = require('dotenv'); // 설명 파일

dotenv.config(); // process.env
const pageRouter = require('./routes/page');

const app = express();
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('view', {
	express : app,
	watch : true,
});

// 로깅을 개발모드(자세하게 로깅해줌) //combinde : 서비스할때 사용
app.use(morgan('dev'));

// public 폴더를 static하게 만드는 설정 ( 프론트에서 자유롭게 접근가능 )
//__dirname = ch09 안에 있는 public
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json()); // json 요청
app.use(express.urlencoded({ extended : false })); // from 요청
app.use(cookieParser(process.env.COOKIE_SECRET)); // cookie 처리
app.use(session({
		resave : false,
		saveUninitialized : process.env.COOKIE_SECRET,
		cookie : {
			httpOnly : true, // javascript 접근불가
			secure : false,  // 보안에 좋음 , https 전환시 true로 설정
		}
	})
);

app.use('/', pageRouter);
app.use(( req, res, next ) => { // 404 NOT FOUND
	const error = new Error(`${ req.method } ${ req.url } 라우터가 없습니다.`);
	error.status = 404;
	next(error);  // error 처리 미들웨어로 간다
});

//에러처리 미들웨어는 반드시 매개변수가 4개
app.use(( err, req, res, next ) => {
	res.locals.message = err.message;
	res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
	res.status(err.status || 500);
	res.render("error"); // ./views/error.html
});

app.listen(app.get('port'), () => {
	console.log(app.get('port'), '번 포트에서 대기중');
	console.log('http://localhost:8001');
});