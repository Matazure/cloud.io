var Socket = require("../../cloud.io");

var socket = new Socket("ws://127.0.0.1:4012");

socket.on("open", function(){
    socket.emit("test", "I'm nodejs cloud.io client test of /.");
})

socket.on("test", function(data, flags){
    console.log(data);
})


var socket1 = new Socket("ws://127.0.0.1:4012/chat");

socket1.on("open", function(){
    socket1.emit("echo", "I'm nodejs cloud.io client echo of /chat");
})

socket1.on("echo", function(data, flags){
    console.log(data);
})
