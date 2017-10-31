var app = require('http').createServer()
var io = require('socket.io')(app)

var port =3000,
    clientCount = 0

app.listen(port)

// socket连接
io.on('connection', function(socket) {
    clientCount++
    socket.nickname = 'user' + clientCount

    // 广播(io) (进来了，进行广播)
    io.emit('enter', socket.nickname + ' enter')

    // 接收client信息(client自定义事件)，然后进行广播
    socket.on('message', function(data) {
        io.emit('message', socket.nickname + ': ' + data)
    })

    // client断开(disconnect 内置事件)
    socket.on('disconnect', function() {
        io.emit('leave', socket.nickname + ' leave')
        clientCount--
    })

})



console.log("websocket server listen on port: " + port)
