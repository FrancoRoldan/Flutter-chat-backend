const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const{ usuarioConectado,usuarioDesconectado, grabarMensaje} = require('../controllers/socket');


// Mensajes de Sockets
io.on('connection',  client => {
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    //valido que está autenticado
    if(!valido) {return client.disconnect();}

    //pongo online al usuario
    usuarioConectado(uid);

    client.join(uid);

    client.on('mensaje-personal',async(payload) =>{
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal',payload);
    });

    client.on('disconnect', () => {
        usuarioConectado(uid);
    });


    
    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);
    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    // });


});
