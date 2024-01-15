"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const path = require('path');
const PORT = process.env.PORT || 3000;
const SOCKET_PORT = process.env.PORT || 3001;
const userRoutes = require('./routes/userRoutes');
require('./config/db');
const fullPath = path.join(__dirname, 'view');
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
const server = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    connectionStateRecovery: {}
});
app.use(express_1.default.static('view'));
io.on('connection', (socket) => {
    socket.on('chat_message', (msg) => {
        io.emit('chat_message', msg);
    });
});
app.get('/', (req, res) => {
    res.sendFile(`${fullPath}/index.html`);
});
//app.use('/',userRoutes)
server.listen(SOCKET_PORT, () => {
    console.log('Socket connected !!');
});
// app.listen(PORT,()=>{
//     console.log('Node app connected !!')
// })
