var ws = require('nodejs-websocket');

var port =3000,
    clientCount = 0

// client连接产生实例
var server = ws.createServer(function (conn) {
    // 每一个连接产生一个实例 加1
    clientCount++

    console.log("New connection：" + clientCount)

    // scoket连接名
    conn.nickname = "user" + clientCount

    //将发送的消息改造为对象
    var msg = {}
    msg.type = "enter"
    msg.data = conn.nickname + "进入房间"

    // 向所有连接进行广播(msg进行格式化)
    broadcast(JSON.stringify(msg))

    // 接收到client消息
    conn.on("text", function (str) {
        console.log("Received "+str)
        var msg = {}
        msg.type = "message"
        msg.data = conn.nickname + ": " + str
        broadcast(JSON.stringify(msg))
    })

    // 关闭连接
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
        var msg = {}
        msg.type = "left"
        msg.data = conn.nickname + "离开房间"
        broadcast(JSON.stringify(msg))
    })

    // 错误捕获
    conn.on("error", function (err) {
        console.log("handle err")
        console.log(err)
    })
}).listen(port)

// 广播函数
function broadcast(str) {
    // 每个连接进行消息发送
    server.connections.forEach(function(conn) {
        conn.sendText(str)
    })
}

console.log("websocket server listen on port: " + port)
