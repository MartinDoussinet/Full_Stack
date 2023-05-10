const http = require('http');

const server = http.createServer((red, res) => {
    res.end('Voilà la réponse 2.0 du serveur !')
});

server.listen( process.env.PORT || 3000);
