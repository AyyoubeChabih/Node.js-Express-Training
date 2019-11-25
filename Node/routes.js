const fs = require('fs');
const path = require('path');

const routes = (req, res) => {
	const url = req.url;

	// Build file path
	let filePath = path.join(
		__dirname,
		'public', 
		url === '/' ? 'index.html' : url
	);

	// Extension of file
	let extname = path.extname(filePath);

	// intial content type
	let contentType = 'text/html';

	// Check ext and set content type
	switch(extname) {
		case '.js' : 
			contentType = 'text/javascript';
			break;
		case '.css' : 
			contentType = 'text/css';
			break;
		case '.json' : 
			contentType = 'application/json';
			break;
		case '.png' : 
			contentType = 'image/png';
			break;
		case '.jpg' : 
			contentType = 'image/jpg';
			break;
	}

	// Read file
	fs.readFile(filePath, (err, content) => {
		if(err) {
			if(err.code == 'ENOENT') {
				// Page Not Found
				fs.readFile(path.join(__dirname, 'public', '404.html'),
				(err, content) => {
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.end(content, 'utf8');
				})
			} else {
				// Some server error
				res.writeHead(500);
				res.end(`Server Error: ${err.code}`)
			}
		} else {
			// Success
			res.writeHead(200, {'Content-Type': contentType});
			res.end(content, 'utf8');
		}
	});
}

module.exports = routes;