const http = require ('http');
const fs = require ('fs').promises;

const server = http.createServer (async ( req, res ) => {
	try {
		res.writeHead (200, { 'Conent-Type' : 'text/html; charset=utf-8' });
		const data = await fs.readFile ('./server2.html');
		res.end (data);

	} catch ( err ) {
		console.log (err);
		res.writeHead (200, { 'Conent-Type' : 'text/plain; charset=utf-8' });
		res.end (err.message);
	}
}).listen (8080);

server.on ('listening', () => {
	console.log ('8080포트에서 서버 대기중 입니다');
	console.log ('http://localhost:8080/');
});

server.on ('error', ( err ) => {
	console.log (err);
});