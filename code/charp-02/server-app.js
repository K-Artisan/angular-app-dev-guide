var express = require('express');
var app = express();
//将项目根目录设置为静态文件目录
app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.send('hello world');
})

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("host->", host, " ;port->", port);
})