import Koa from 'koa'
import Logger from 'koa-logger'
import Routing from './router'
import handleError from 'koa-onerror'
import cors from 'koa-cors'
import serve from 'koa-static'
import fs from 'fs'
import conditionalGet from 'koa-conditional-get'
import etag from 'koa-etag'
import compress from 'koa-compress'

const app = new Koa()
const ASSET_DIR = fs.existsSync(__dirname + '/../build') ? __dirname + '/../build' : __dirname

handleError(app)

app
    .use(conditionalGet())
    .use(etag())
    .use(compress({
      filter: function (content_type) {
        return true
      },
      threshold: 2048,
      flush: require('zlib').Z_SYNC_FLUSH
    }))
    .use(serve(ASSET_DIR, {
      maxage: 3.154e+10 // 1yr
    }))
    .use(cors())
    .use(Logger())
    .use(Routing.routing)
    .use(Routing.allowed)

console.log('server listening at 127.0.0.1:3001')
app.listen(3001)
