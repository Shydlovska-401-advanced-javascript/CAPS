
const emitter = require('./event.js')


emitter.on('pickup', onPickup);
emitter.on("in-transit", inTransit);

function onPickup(order){
    setTimeout(() => {
//  log "driver" picked up [ORDER_ID]
console.log(`DRIVER: picked up ${order.payload.orderID}`);
order.event = "in-transit";
order.time = new Date();
emitter.emit('in-transit', order);
}, 1000);

}

function inTransit(order) {
    setTimeout(() => {
    console.log(`DRIVER: delivered ${order.payload.orderID}`);
    order.event = "delivered";
    order.time = new Date();
    emitter.emit('delivered', order)
}, 3000);
}



