import express from 'express'
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000
const SOCKET_PORT = process.env.PORT || 3001
const userRoutes = require('./routes/userRoutes') 
require('./config/db') 

const fullPath = path.join(__dirname,'view')

import { createServer } from 'node:http'
import { Server } from 'socket.io'
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {}
  })

app.use(express.static('view'))

io.on('connection', (socket) => {
    socket.on('chat_message', (msg) => {
        io.emit('chat_message', msg)
    })
})

app.get('/',(req,res)=>{
    res.sendFile(`${fullPath}/index.html`)
}) 
 
//app.use('/',userRoutes)

server.listen(SOCKET_PORT,()=>{
    console.log('Socket connected !!')
})
// app.listen(PORT,()=>{
//     console.log('Node app connected !!')
// })