require('dotenv').config();
require('./caps.js')
require('./driver.js')
const events= require('./event.js');
const faker = require('faker');
// const { start } = require('repl');


function simulateOrder(){
    // console.log("here")
    let name = faker.name.findName();
    let orderID = faker.random.uuid();
    let address = faker.address.city();
    
    let newOrder = {
        store: process.env.STORE,
        orderID: orderID,
        customer: name,
        address: address
    
    }

    // events.emit('pickup', newOrder)
    events.emit('pickup', {event: "pickup", time: new Date(), payload: newOrder})


}

events.on('delivered',deliveredHendler)


function deliveredHendler(order){
    console.log(`VENDOR: Thank you for delivering ${order.payload.orderID}`)
}

function start() {
    simulateOrder();
    setInterval(simulateOrder, 5000);
}

start();


module.exports= start;








