const express = require ('express');
const path = require ('path');
const morgan = require ('morgan');
const cookieParser = require ('cookie-parser');
const session = require ('express-session');

const dotenv = require('dotenv')
dotenv.config()
const app = express ();

app.set ('port', process.env.PORT || 3000);

app.use (morgan ('dev')); // 개발할때 사용
// app.use(morgan('combined'))  // 배포할때 사용

// app.use('요청경로',express.static(__dirname ,'실제경로'))

app.use (cookieParser (process.env.COOKIE_SECRET));
app.use (session ({
		resave : false,
		saveUninitialized : false,
		secret : process.env.COOKIE_SECRET,
		cookie : {
			httpOnly : true,
		},
	}));
app.use (express.json ());
app.use (express.urlencoded ({ extended : true }));


// app.use (( req, res, next ) => {
// 	console.log ('1 요청을 실행하고싶어요');
// 	next ();
// }, ( req, res, next ) => {
// 	try {
// 		console.log ("try 에러문");
// 		console.log (asdffasdasdf);
// 	} catch ( err ) {
// 		next (err);
// 	}
// });

app.get ('/', ( req, res, next ) => {
	// req.session.id = 'hello'
	res.sendFile (path.join (__dirname, 'index.html'));
});


app.post ('/', ( req, res ) => {
	res.send ('hello express');
});

app.get ('/about', ( req, res ) => {
	res.send ('hello express');
});

app.use (( req, res, next ) => {
	res.status (404).send ('404에러');
});

app.use (( err, req, res, next ) => {
	console.log (err);
	res.send ("에러 메세지 ");
});

app.listen (app.get ('port'), () => {
	console.log ('express Server Start');
});