var app = require('http').createServer()
var io = require('socket.io')(app);

// server监听端口
app.listen(3000);

// socket连接
io.on('connection', function(socket) {
    // 向client发送消息(自定义事件名；直接发送对象信息)
    socket.emit('news', { hello: 'world' });
    // 获取client发送过来的消息(事件名；回调函数对信息处理)
    socket.on('my other event', function(data) {
        console.log(data);
        // console.log(data.my);
    });
});
