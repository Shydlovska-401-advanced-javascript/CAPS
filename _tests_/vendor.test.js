const vendor = require('../vendor.js');
const emitter = require('../event.js');

jest.useFakeTimers();

it('should receive delivery politely', () => {
  console.log = jest.fn();
  emitter.emit('delivered', { payload: {orderID : '1234' }});
  expect(console.log).toHaveBeenCalledWith('VENDOR: Thank you for delivering 1234');
});

