function onConnection(socket) {
    socket.on('join', (data) => {
        let boardId = data.boardId;
        if(socket.boardId) {
            socket.leave(socket.boardId);
        }
        socket.boardId = boardId;
        socket.join(boardId);
    });

    socket.on('update', (data) => {
        console.log('message received: ', data);
        console.log('emiting to board: ', data.boardId);
        socket.broadcas.to(data.boardId).emit('update', data)
    });
}

var comm = {};
comm.configure = function(server) {
    io = require('socket.io')(server);
    io.on('connection', onConnection);
}

module.exports = comm;