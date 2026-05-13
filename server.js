/*

    HUSH MESSAGE PROTOCOL

    join:
    {
    type: "join",
    nickname: "nickname"
    }

    message:
    {
    type: "message",
    nickname: "john",
    content: "message content"
    }

    system:
    {
    type: "system",
    content: "system message content"
    }

*/




const WebSocket = require('ws')

const server = new WebSocket.Server({ port: 3000 })

console.log('Hush server running on ws://localhost:3000')

// You can create variable right into socket by socket.{variableName}


// if someone connects to the server do this 
server.on('connection', (socket) => {
    console.log('Someone joined Hush')
    // how to show their name tho? I have the input in index.html how to get it to the server? 


    // if the server receives a message from client do this
    socket.on('message', (message) => {

        const data = JSON.parse(message.toString())

        if (data.type === "join"){
            socket.nickname = data.nickname
            console.log(`${socket.nickname} has joined the chat.`)
        }

        if (data.type === "message"){
            server.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN){
                    client.send(JSON.stringify({
                        type: "message",
                        nickname: socket.nickname,
                        content: data.content
                    }))
                }
            })
        }

        console.log('Received;', message.toString())
    })


    // if the server receives info that someones socket has been closed do this 
    socket.on('close', () => {
        console.log(`${socket.nickname} has left the chat.`)  // log the nickname to the console
    })
})