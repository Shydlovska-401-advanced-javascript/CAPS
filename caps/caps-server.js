'use strict';
const net = require('net');
const port = 3000;
const server = net.createServer();
server.listen(port, () => {
  console.log('opened server on', server.address().port);
});

let orders = [];
let drivers = [];


let socketPool ={};
server.on('connection', (socket) => { 

    socket.on('data', (buffer) => {
        const id = `Socket-${Math.random()}`;
        socketPool[id] = socket;
        dispatchEvent({socketId: id, buffer:buffer})
    })

    socket.on('error', (e) => { console.log('SOCKET ERROR', e)});
})


server.on('error', (e) => {
    console.error('SERVER ERROR', e.message);
  });

function dispatchEvent(data) {
let event = {
    socketId: data.socketId,
    buffer: JSON.parse(data.buffer.toString())
}
broadcast(event);
}

function broadcast(data) {
    console.log(data);

    let event = data.buffer;

    // if ready for pick up then this is driver
    if(event.event === 'ready to pickup'){
        // console.log("got driver");
        if(orders.length > 0) {
            // console.log("have and order");
            let firstOrder = orders.shift();
            orders.push(firstOrder);
            let payload = JSON.stringify(firstOrder.buffer);
            socketPool[data.socketId].write(payload);
            // console.log("sent driver");
            delete socketPool[data.socketId];
        } else {
            drivers.push(data);
        }
    } else if(!event.payload || !event.event){
        throw new Error('Missing data in the request.')
    } else if (event.event === "pickup") {
        // console.log("got order");
        if(event.payload.store && event.payload.orderID && event.payload.customer && event.payload.address){
            if(drivers.length > 0) {
                let driver = drivers.unshift();
                let payload = JSON.stringify(event.payload);
                socketPool[driver.socketId].write(payload);
            }
            orders.push(data);
        } else {
            throw new Error('Missing data in the request.');
        }
    } else if(event.event === "delivered") {
        for (let i = 0; i< orders.length; i++) {
            if (orders[i].buffer.payload.orderID === event.payload.orderID) {
                let payload = JSON.stringify(event);
                socketPool[orders[i].socketId].write(payload);
                delete socketPool[orders[i].socketId];

                orders.splice(i, 1);
            }
        }
        socketPool[data.socketId].write(JSON.stringify({event: "done"}));
        delete socketPool[data.socketId];
    } else {
///
    }
}









