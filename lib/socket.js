var WebSocket = require("ws");
var EventEmitter = process.EventEmitter;

exports = module.exports = Socket;

function Socket(url){
    var self = this;
    this.webSocket = new WebSocket(url);
    this.webSocket.on('open', function(){
        self.$emit('open');
    });

    this.webSocket.on('close', function(){
        self.$emit("close");
    });

    this.webSocket.on('error', function(){

    });

    this.webSocket.on("message", function(data, flags){
        try{
            var jsonData = JSON.parse(data);
            self.$emit(jsonData.type, jsonData.data);
        }catch (e){
            self.$emit('error', 'data not json object');
        }
    });
}

Socket.prototype.__proto__ = EventEmitter.prototype;
Socket.prototype.$emit = EventEmitter.prototype.emit;

Socket.prototype.emit = function(type, data){
    var jsonData = {type: type, data: data};
    var str = JSON.stringify(jsonData);
    this.webSocket.send(str);
}
