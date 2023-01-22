const http = require ('http');

const server = http.createServer (( req, res ) => {
	res.writeHead(200, {'Conent-Type' : 'text/html; charset=utf-8'})
	res.write ('<h1>Hello node</h1>');
	res.write ('<p>Hello Server</p>');
	res.end ('<p>Hello Seop</p>');
}).listen (8080);

server.on ('listening', () => {
	console.log ('8080포트에서 서버 대기중 입니다');
	console.log ('http://localhost:8080/');
});

server.on ('error', ( err ) => {
	console.log (err);
});