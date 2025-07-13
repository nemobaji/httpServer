const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
    cert: fs.readFileSync('Path to the domain certificate'),
    key: fs.readFileSync('Path to the domain secret key'),
    ca: [
        fs.readFileSync('Path to the parent certificate'),
        fs.readFileSync('Path to the parent certificate')
    ]
}, (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Hello, World!</h1>');
    res.end('<p>Hello, Server!</p>');
});

server.listen(8080);
server.on('listening', () => {
    console.log('server is running on PORT 8080');
});
