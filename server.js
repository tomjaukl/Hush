const WebSocket = require('ws')

const server = new WebSocket.Server({ port: 3000 })

console.log('Hush server running on ws://localhost:3000')


// if someone connects to the server do this 
server.on('connection', (socket) => {
    console.log('Someone joined Hush')
    // how to show their name tho? I have the input in index.html how to get it to the server? 


    // if the server receives a message from client do this
    socket.on('message', (message) => {
        console.log('Received message;', message.toString())
    })


    // if the server receives info that someones socket has been closed do this 
    socket.on('close', () => {
        console.log('Someone left Hush')
    })
})