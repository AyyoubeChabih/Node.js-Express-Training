// // const person = require('./person'); // command JS

// console.log(person);

// const Person = require('./Person_Class');

// const p1 = new Person('Ayyoube Chabih', 22);

// p1.greeting();

// const Logger = require('./logger');

// const logger = new Logger();

// logger.on('message', (data) => console.log('Called Listener: ', data));

// logger.log('Hello World!');
// logger.log('Hi!');
// logger.log('Chabih');

const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    //console.log(req.url);
    // nodemon : pour faire des changement sans redemarrage du server
    // on l'ajouter dan package.json, et on execute la commande npm run [script_name]
    // if(req.url === '/') {
    // 	fs.readFile(
    // 		path.join(__dirname, 'public', 'index.html'),
    // 		(err, content) => {
    // 			if(err) throw err;
    // 			res.writeHead(200, {'Content-Type': 'text/html'});
    // 			res.end(content);
    // 		}
    // 	);
    // 	// res.writeHead(200, {'Content-Type': 'text/html'})
    // 	// res.end('<h1>HOME</h1>');
    // }
    // if(req.url === '/about') {
    // 	fs.readFile(
    // 		path.join(__dirname, 'public', 'about.html'),
    // 		(err, content) => {
    // 			if(err) throw err;
    // 			res.writeHead(200, {'Content-Type': 'text/html'});
    // 			res.end(content);
    // 		}
    // 	);
    // }
    // if(req.url === '/api/users') {
    // 	const users = [
    // 		{name: 'Ayyoube Chabih', age: 22},
    // 		{name: 'Aomine Daiki', age: 21}
    // 	];
    // 	res.writeHead(200, {'Content-Type': 'application/json'});
    // 	res.end(JSON.stringify(users));
    // }

    // Build file path
    let filePath = path.join(
        __dirname,
        'public',
        req.url === '/' ? 'index.html' : req.url
    );

    // Extension of file
    let extname = path.extname(filePath);

    // intial content type
    let contentType = 'text/html';

    // Check ext and set content type
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    // Read file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                // Page Not Found
                fs.readFile(
                    path.join(__dirname, 'public', '404.html'),
                    (err, content) => {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf8');
                    }
                );
            } else {
                // Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
