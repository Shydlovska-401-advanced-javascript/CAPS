'use strict';

require('dotenv').config();
const faker = require('faker');

const io = require('socket.io-client');
const vendorChannel = io.connect('http://localhost:3000/caps');


vendorChannel.on('delivered', (event) =>{
    console.log(`Thank you for delivering ${event.payload.orderID}`)

});






















