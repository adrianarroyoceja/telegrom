const socketIO = require('socket.io');
const socket = {}; //Los objetos se guardan como referencia

function connect(server) {
    socket.io = socketIO(server);
}

module.exports = {
    connect,
    socket,
}