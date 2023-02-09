const express = require('express');
const cookieParser = require('cookie-parser'); // 쿠키사용
const morgan = require('morgan'); // 요청과 응답을 위한
const path = require('path'); // node 내장모듈
const session = require('express-session'); // 로그인에 세션을 사용하기 위한
const nunjucks = require('nunjucks'); // 화면 그리기 위한
const dotenv = require('dotenv'); // 설명 파일
const passport = require('passport')  // 여권 발급
const { sequelize } = require('./models'); // db객체 안에 들어있는 sequelize ( index.js )

dotenv.config(); // process.env
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const userRouter = require('./routes/user')

const passportConfig = require('./passport')
const app = express();
passportConfig();

app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', {
	express : app,
	watch : true,
});

sequelize.sync({ force : false })// force:true 서버 재시작시 제거후 생성(개발중에만)
	.then(() => {
		console.log('데이터베이스 연결 성공');
	}).catch(( err ) => {
	console.log(err);
});


// 로깅을 개발모드(자세하게 로깅해줌) //combinde : 서비스할때 사용
app.use(morgan('dev'));

// public 폴더를 static하게 만드는 설정 ( 프론트에서 자유롭게 접근가능 )
//__dirname = ch09 안에 있는 public
app.use(express.static(path.join(__dirname, 'public')));

app.use('/img',express.static(path.join(__dirname, 'uploads')));

// json 요청, req,body를 ajax json 요청으로부터
app.use(express.json());

// from 요청, req.body 폼으로부터
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser(process.env.COOKIE_SECRET)); // cookie 처리
app.use(session({
		resave : false,
		saveUninitialized : false,
		secret : process.env.COOKIE_SECRET,
		cookie : {
			httpOnly : true, // javascript 접근불가, 보안에 좋음
			secure : false,  // https 전환시 true로 설정
		}
	})
);

// 반드시 express.session 밑에 passport 해야댐
app.use(passport.initialize()); // req.user, req.login, req.isAtuhenticate, req.logout
app.use(passport.session()) // connect.sid 라는 세션 쿠키가 브라우저로 전송

app.use('/', pageRouter);
app.use('/auth', authRouter)
app.use('/post', postRouter)
app.use('/user', userRouter)


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