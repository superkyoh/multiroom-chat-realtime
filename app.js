/* importar config do servidor */
var app = require('./config/server');

/* paramentrizar a porta de escuta */
var server = app.listen(80, function(){
    console.log('server online');
});

//socket escuta a porta 80 também
var io = require('socket.io').listen(server);

app.set('io', io);

//criar conexão por websocket
io.on('connection', function(socket){
    socket.on('disconnect', function(){
        console.log('Usuario desconectou')
    });

    socket.on('msgToServer', function(data){
        //atualiza dialogo
        socket.emit('msgToClient', {apelido: data.apelido, mensagem: data.mensagem});
        socket.broadcast.emit('msgToClient', {apelido: data.apelido, mensagem: data.mensagem});

        //atualiza participantes
        if(parseInt(data.apelidoAtualizado) == 0) {
            socket.emit('participToClient', {apelido: data.apelido, mensagem: data.mensagem});
            socket.broadcast.emit('participToClient', {apelido: data.apelido, mensagem: data.mensagem});
        }
    });
});

