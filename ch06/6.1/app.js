const express = require ('express');
const path = require ('path');
const app = express ();

app.set ('port', process.env.PORT || 3000);

app.use (( req, res, next ) => {
	console.log ('1 요청을 실행하고싶어요');
	next ();
});

app.get ('/', ( req, res ) => {
	// res.sendFile (path.join (__dirname, 'index.html'));
	res.status(200).send("hello")
});


app.post ('/', ( req, res ) => {
	res.send ('hello express');
});

app.get ('/about', ( req, res ) => {
	res.send ('hello express');
});

app.use((req, res, next) => {
	res.send('404에러')
})

app.use (( err, req, res, next ) => {
	console.log (err);
	res.send ("에러 메세지 ");
});

app.listen (app.get ('port'), () => {
	console.log ('express Server Start');
});