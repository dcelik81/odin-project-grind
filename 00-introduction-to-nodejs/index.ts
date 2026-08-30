import http from 'http';
import fs from 'fs';
import path from "path";

function filePath(route: string | undefined) {
    let r = "404.html";

    switch (route) {
        case "/":
            r = "index.html";
            break;
        case "/about":
            r = "about.html";
            break;
        case "/contact":
            r = "contact-me.html";
            break;
    }

    return path.join(__dirname, r);
}

const server = http.createServer((req, res) => {
    const route = req.url;

    fs.access(filePath(route), fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            const fileStream = fs.createReadStream(filePath(route));
            fileStream.pipe(res);
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });

        const fileStream = fs.createReadStream(filePath(route));
        fileStream.pipe(res);
    });
});

server.listen(8000);
