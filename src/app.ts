import http from 'http';
import url from 'url';
import { Server } from './server/server';

const server = new Server(3000);

server.route('/', (req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');

})

server.route('/meow', (req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('MEOW!\n');

})