import http from 'http';
import fs from 'fs';
import { projectRoot } from '../helpers/projectRoot';

export const sendHtml = (publicFilePath: string, res: http.ServerResponse) => {

    const path = projectRoot + '/public/' + publicFilePath;

    console.log('file path:', path);

    fs.readFile(path, null, (err, data) => {

        if (err) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('File not found\n');
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        }

    })

}