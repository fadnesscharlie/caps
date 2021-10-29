'use strict';

const events = require('../util/event-pool.js');
const faker = require('faker');

// MODELS
events.on('pickup', (payload) => logEvent('pickup', payload))
events.on('in-transit', (payload) => logEvent('in-transit', payload))
events.on('delivered', (payload) => logEvent('delivered', payload))
events.on('vendor-delivered', (payload) => vendorLogEvent( payload))

let delivery = {
  store: 'Best Store',
  orderID: faker.datatype.uuid(),
  customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
  addreess: `${faker.address.city()}, ${faker.address.state()}`,
}

let vendorDelivered = `VENDOR: Thank you for delivering ${delivery.orderID}`

setInterval(() => {
  events.emit('pickup', delivery)
}, 5000)

setInterval(() => {
  events.emit('vendor-delivered', vendorDelivered)
}, 5500)

// callback function
function logEvent(event, payload) {
  let loggedEvent = {
    event: event,
    time: new Date(),
    payload: payload
  }
  console.log('EVENT',loggedEvent)
}

function vendorLogEvent(payload) {
  console.log(payload)
}

module.exports = {logEvent, vendorLogEvent};

