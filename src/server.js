const http = require('http');
const fs = require('fs');
const Koa = require('koa');
const route = require('koa-route');
const cors = require('koa2-cors');

const app = new Koa();
app.use(cors());

const result = JSON.parse(fs.readFileSync('./src/flights.json'));

const showAllFlights = ctx => {
  ctx.response.body = result;
};

app.use(route.get('/flights', showAllFlights));

const port = 7070;
const server = http.createServer(app.callback());
server.listen(port);