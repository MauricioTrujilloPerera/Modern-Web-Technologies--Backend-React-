import http from 'node:http';

// Create a local server to receive data from
const server = http.createServer((req, res) => {
    console.log(req);

    if (req.url === "/") { // if the response is the root URL, then do this:
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
        data: 'Home Response Data: - Home Page Response Example',
        }));
    }

    else if (req.url == "/about") {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
        data: 'My name is Mauricio, I was born in Cuba! Response Data: - About Page Response Example',
        }));
    }

    else if (req.url == "/contact") {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
        data: '(999)-999-99999: - Contact Page Response Example',
        }));
    }
});

server.listen(3000);