import http from 'http';
import url from 'url';


export class Server {
    private server: http.Server;
    private PORT: number;

    private observers = new Map<string, (req: http.IncomingMessage, res: http.ServerResponse) => void>();

    constructor(port: number) {
        this.PORT = port;

        this.server = http.createServer((req, res) => this.next(req, res));
        
        this.server.listen(this.PORT, () => {
            console.log(`Server running at http://localhost:${this.PORT}/`);
        });
    }

    public route(path: string, observer: (req: http.IncomingMessage, res: http.ServerResponse) => void) {

        this.observers.set(path, observer);

        return () => {
            this.observers.delete(path);
        };
    }

    private next(req: http.IncomingMessage, res: http.ServerResponse): void {

        const parsedUrl = url.parse(req.url || '', true);
        console.log(`Received request for: ${parsedUrl.pathname}`);

        const observer = this.observers.get(parsedUrl.pathname!);

        if (observer) observer(req, res);
        else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('404 Page not found\n');
            console.error("Route not handled")
        };

    }

}