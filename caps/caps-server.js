'use strict';


// // Task 1: queue up the messages 

const messages = {}

const io = require('socket.io')(3000);

io.on('connection', (socket) => {
    console.log('CONNECTED', socket.id);

})

const caps = io.of('/caps');

caps.on('connection', (socket) =>{
    console.log('CAPS channel', socket.id);

    socket.on('join', room => {
        socket.join(room);
      });

      /////////////////????

    socket.on('received', orderID => {

        // delete messages

        delete messages[orderID]
        console.log('deliting ',orderID, messages)
    })

    socket. on( 'getall' , () => {
        for(let id in messages){
            const payload = messages[id];
            caps.emit('pickup', payload);
        }  
    })


//////////////////////?????

    socket.on('pickup', (payload) =>{

        log(payload);
    
        messages[payload.payload.orderID] = payload;

        console.log(Object.keys(messages).length, 'messages');

        caps.emit('pickup', payload);
    })


    socket.on('in-transit', (payload) =>{
        log(payload);
        caps.to('vendor').emit('in-transit',payload);
    })

    socket.on('delivered', (payload) =>{
        log(payload);
        caps.to('vendor').emit('delivered',payload);
    })


    let log = function(data) {
        console.log('EVENT', data);
    }

})
