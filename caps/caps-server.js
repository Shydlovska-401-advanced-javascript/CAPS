'use strict';

const io = require('socket.io')(process.env.PORT || 3000);


io.on('connection', (socket) => {
    console.log('CONNECTED', socket.id);

})

const caps = io.of('/caps');

caps.on('connection', (socket) =>{
    console.log('CAPS channel', socket.id);

    socket.on('join', room => {
        // console.log('joined', room);
        socket.join(room);
      });


    socket.on('pickup', (payload) =>{
        console.log('EVENT', payload);
        caps.emit('pickup', payload);
    })

    socket.on('in-transit', (payload) =>{
        console.log('EVENT', payload);
        caps.to('vendor').emit('in-transit',payload);
    })

    socket.on('delivered', (payload) =>{
        console.log('EVENT', payload);
        caps.to('vendor').emit('delivered',payload);
    })

})
