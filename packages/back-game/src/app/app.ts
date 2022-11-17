import http from 'http'
import { Server } from 'socket.io'
import { UsingHelper } from 'ts-socket.io-controller'

const server: http.Server = http.createServer()

const io = new Server(server)

server.listen(30459)

UsingHelper.useSocketServer(io, {
    controllers: [],
    middlewares: []
})

console.log('slt')