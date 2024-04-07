const http = require('http');
const os = require('os');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(`Adres IP serwera: ${getIPAddress()}\n`);
        res.write(`Nazwa serwera (hostname): ${os.hostname()}\n`);
        res.write(`Wersja aplikacji: ${process.env.APP_VERSION}\n`); 
        res.end();
    } else {
        res.writeHead(405, {'Content-Type': 'text/plain'});
        res.end('Metoda nieobsługiwana');
    }
});

server.listen(4000, () => {
    console.log('Serwer działa na porcie 4000');
});

function getIPAddress() {
    const interfaces = os.networkInterfaces();
    for (let dev in interfaces) {
        for (let i = 0; i < interfaces[dev].length; i++) {
            const iface = interfaces[dev][i];
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'Nie można uzyskać adresu IP';
}
