const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const{ usuarioConectado,usuarioDesconectado} = require('../controllers/socket');


// Mensajes de Sockets
io.on('connection',  client => {
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    //valido que está autenticado
    if(!valido) {return client.disconnect();}

    //pongo online al usuario
    usuarioConectado(uid);

    console.log('Cliente autenticado');

    client.on('disconnect', () => {
        usuarioConectado(uid);
    });


    
    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);
    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    // });


});
