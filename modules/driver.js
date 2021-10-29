'use strict';

const events = require('../util/event-pool.js');
const faker = require('faker');

events.on('driver-pickup', (payload) => driverLogEvent( payload))
events.on('driver-delivered', (payload) => driverLogEvent( payload))

let delivery = {
  store: 'Best Store',
  orderID: faker.datatype.uuid(),
  customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
  addreess: `${faker.address.city()}, ${faker.address.state()}`,
}

let driverPickup = `DRIVER: picked up ${delivery.orderID}`
let driverDelivered = `DRIVER: delivered ${delivery.orderID}`

setInterval(() =>{
  events.emit('driver-pickup', driverPickup)
  events.emit('in-transit', delivery)
  events.emit('driver-delivered', driverDelivered)
}, 5250)

setInterval(() =>{
  events.emit('delivered', delivery)
}, 5550)

function driverLogEvent(payload) {
  console.log(payload)
}

module.exports = driverLogEvent;
