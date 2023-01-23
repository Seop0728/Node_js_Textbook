const express = require ('express');
const path = require ('path');
const morgan = require ('morgan');
const cookieParser = require ('cookie-parser');

const app = express ();

app.set ('port', process.env.PORT || 3000);

app.use (morgan ('dev')); // 개발할때 사용
// app.use(morgan('combined'))  // 배포할때 사용
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use (cookieParser ());

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

app.get ('/', ( req, res ) => {
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