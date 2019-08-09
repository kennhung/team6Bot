const { JSZhuyin } = require('jszhuyin');
const http = require('http');

var jszhuyin = new JSZhuyin();
jszhuyin.load();

const server = http.createServer((request, response) => {
    if (request.method != 'POST') {
        response.writeHead(405);
        response.end('ERROR 405');
        return
    }

    let body = '';

    request.on('data', function (data) {
        body += data;
    });

    request.on('end', function () {
        console.log('Body: ' + body);
        if (body.length === 0) {
            response.writeHead(400);
            response.end('ERROR 400');
            return
        }

        jszhuyin.oncandidateschange = function (c) {
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end(c[0][0]);
        };

        jszhuyin.handleKey(body);
    });
});

server.listen(8666);
console.log('server started at port 8666')