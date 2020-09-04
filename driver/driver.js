'use strict';

const io = require('socket.io-client');
const driverChannel = io.connect('http://localhost:3000/caps');

// driverChannel.emit('getall'); //?????????

driverChannel.on('pickup', (payload) => {
let event = JSON.parse(payload)
    onPickup(event);
   
});

  

function onPickup(order){
    // driverChannel.emit('recieved', order.payload.orderID)  //??????????? or socket?!
    setTimeout(() => {
    console.log(`DRIVER: picked up ${order.payload.orderID}`);
    order.event = "in-transit";
    order.time = new Date()
    let event = JSON.stringify(order);
    driverChannel.emit('in-transit',event)

    inTransit(order)
}, 1500);
}

function inTransit(order) {
    setTimeout(() => {
    console.log(`DRIVER: delivered ${order.payload.orderID}`);
    order.event = "delivered";
    order.time = new Date();
    let event = JSON.stringify(order);
    driverChannel.emit('delivered',event)
}, 3000);
}



