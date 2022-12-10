const bodyParser = require('body-parser')
const cors = require('cors')
const debug = require('debug')('service:app');
const express = require('express')
const fs = require('fs')
const https = require('https')
const path = require('path')
const port = 3000

let commandMessage = ''


const app = express()

const app_root = path.resolve(__dirname)
debug('application root', app_root)

// setup SSL for HTTPS & WSS
const key = fs.readFileSync(`${app_root}/local.key`)
const cert = fs.readFileSync(`${app_root}/local.crt`)
const server = https.createServer({key:key,cert:cert}, app)

require('express-ws')(app, server)


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({limit:'10mb'}))

app.use(cors())


app.use('/', express.static(`${__dirname}/public`))


app.ws('/', async(ws,req)=>{
  debug('WS::ROOT conx')
  
  ws.on('message', msg=>{    
    try {
      const message = JSON.parse(msg)

      debug('WS::ROOT msg', message)

      ws.send(JSON.stringify(message))
    } catch (error) {
      ws.send({error: 'bad request'})
    }
  })
})


server.on('error', err=>{
  console.error(err)
})

server.listen(port, msg=>{
  debug(msg)
})


debug(`app listening on port ${port}`)