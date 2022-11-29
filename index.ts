import http from "http";

const server = http.createServer(() => {
    console.log('пришёл запрос!')
});

server.listen(3000);

