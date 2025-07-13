const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`Master process ID: ${process.pid}`);

    // Create a worker process for each available CPU core
    for (let i = 0; i < numCPUs; i += 1) {
        cluster.fork();
    }

    // Listen for worker exit events
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} has exited`);
        console.log('Exit code:', code, 'Signal:', signal);
    });
} else {
    let requestCount = 0; // Counter for requests handled by this worker

    // Create an HTTP server
    http.createServer((req, res) => {
        requestCount += 1; // Increment request counter
        console.log(`[PID ${process.pid}] Request #${requestCount}`); // Log request number with worker PID

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Hello, World!</h1>');
        res.end('<p>Hello, Server!</p>');
    }).listen(8080);

    // Log that the worker is running
    console.log(`Worker ${process.pid} is listening on PORT 8080`);
};
