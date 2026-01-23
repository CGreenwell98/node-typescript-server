import http from 'http';
import url from 'url';
import { Server } from './server/server';
import { sendHtml } from './server/sendHtml';

const server = new Server(3000);

server.route('/', (req, res) => {
    
    sendHtml('index.html', res);

})

server.route('/meow', (req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('MEOW!\n');

})