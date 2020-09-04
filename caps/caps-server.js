'use strict';


// // Task 1: queue up the messages 

// const messages = {
//     //  waiting for messages to queue, sensibly 

// //     pickup:{
// // // need to segment by driver as we;;
// //      driver:{
// // // driver releted messages here by some unqueue id
// //      }
// //     }
// }

const io = require('socket.io')(process.env.PORT || 3000);


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

    // socket.on('received', orderID => {

    //     // delete messages

    //     delete messages[orderID]
    //     console.log('deliting ',orderID, messages)
    // })

    // socket. on( 'getall' , () => {
    //     const payload = messages[id];
    //     caps.emit('pickup', payload);
    // })


//////////////////////?????

    socket.on('pickup', (payload) =>{

        //  we need queue up pickup messages

        // messages.[payload.orderID] = payload; /////????

        log(payload);

        // console.log(messages);

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
