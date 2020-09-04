'use strict';

const io = require('socket.io-client');
const socket= io.connect('http://localhost:3000/caps');

socket.emit('getall'); //?????????

socket.on('pickup', (order) => {
    socket.emit('received', order.payload.orderID)  //??????????? or socket?
    onPickup(order);
});

  

function onPickup(order){
   
    setTimeout(() => {
    console.log(`DRIVER: picked up ${order.payload.orderID}`);
    order.event = "in-transit";
    order.time = new Date()
    // let event = JSON.stringify(order);
    socket.emit('in-transit',order)
    inTransit(order)
}, 1500);
}

function inTransit(order) {
    setTimeout(() => {
    console.log(`DRIVER: delivered ${order.payload.orderID}`);
    order.event = "delivered";
    order.time = new Date();
    // let event = JSON.stringify(order);
    socket.emit('delivered',order)
}, 3000);
}



