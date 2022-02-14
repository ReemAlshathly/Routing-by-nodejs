const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3001;

const server = http.createServer((req, res) => {
	let htmlFile = '';
	
	
	switch(req.url) {
		case '/':
			htmlFile = 'home.html';
			break;
		case '/about':
			htmlFile = 'about.html';
			break;
		case '/login':
			 htmlFile = 'login.html';

			// switch(linkparts[1]) {
			// 	case '':
			// 		htmlFile = 'login.html';
			// 		break;
				
			// 	case 'role=Admin':
			// 		res.end("welcomAdmin");
			// 		break;
			// 	default:
			// 		break;
			// }
			
			break;
		default:
			htmlFile = 'Error.html';
			break;
	}
	var linkparts=req.url.split("/");
	switch(linkparts[2]) {
				case '/':
					res.write("new")
					break;
				
				case 'role=Admin':
					res.end("<h1>welcom Admin</h1>");
					break;
				default:
					break;
			}

	if(htmlFile)
		render(res, htmlFile);
});

function render(res, htmlFile) {
  	fs.stat(`./${htmlFile}`, (err, stats) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
  		if(stats) {
		  	fs.createReadStream(htmlFile).pipe(res);
  		} else {
			res.statusCode = 404;
			htmlFile = 'Error.html';
			fs.createReadStream(htmlFile).pipe(res);
			  
  		}
  	});
}

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});