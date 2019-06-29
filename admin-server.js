const Koa = require('koa')
const Static = require('koa-static')
const send = require('koa-send')
const Router = require('koa-router')

const app = new Koa()

const route = new Router()

route.get('*',async ctx=>{
    await send(ctx,'build/index.html')
})

app.use(Static(__dirname + '/build'))

app.use(route.routes())
.use(route.allowedMethods())

app.listen('4000')

console.log("App start at port 4000")