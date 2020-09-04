'use strict';

require('dotenv').config();
const faker = require('faker');

const io = require('socket.io-client');
const vendorChannel = io.connect('http://localhost:3000/caps');

function simulateOrder(){
    let customName = faker.name.findName();
    let orderID = faker.random.uuid();
    let address = faker.address.city();
    
    let newOrder = {
        store: process.env.STORE,
        orderID: orderID,
        customer: customName,
        address: address
    
    }
    let time = new Date();
    let event = { event: 'pickup', time: time, payload: newOrder};
    vendorChannel.emit("pickup", event);


}

function start() {
    vendorChannel.emit('join', 'vendor'); 
    simulateOrder();
    setInterval(simulateOrder, 5000);
}

start();

vendorChannel.on('delivered', (event) =>{
    console.log(`Thank you for delivering ${event.payload.orderID}`)

});


module.exports =start;




















