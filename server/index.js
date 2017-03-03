import Koa from 'koa';
import Logger from 'koa-logger';
import Routing from './router';
import handleError from 'koa-onerror';
import cors from 'koa-cors';

const app = new Koa();

handleError(app);

app
    .use(cors())
    .use(Logger())
    .use(Routing.routing)
    .use(Routing.allowed)
;

console.log('server listening at 127.0.0.1:3001');
app.listen(3001);