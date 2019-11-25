const http = require('http');

const routes = require('./routes');

const server = http.createServer(routes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));