'use strict';

// connection to socket io as a client
const io = require('socket.io-client');

// connect to the hub
const socket = io.connect('http://localhost:3000/caps');

socket.on('pickup', (payload) => {
  console.log('Driver picked up: ', payload.orderID)
  // setTimeout(() => {
  //   console.log('Driver picked up: ', payload.orderID)
  //   socket.emit('pickup', payload)
  //   socket.emit('in-transit', payload)
  //   console.log('Driver delivered: ', payload.orderID)
  //   socket.emit('delivered', payload)
  // }, 5000)
    // socket.emit('pickup', payload)
    // socket.emit('in-transit', payload)
    // console.log('Driver delivered: ', payload.orderID)
})
  
socket.on('in-transit', (payload) => {
  console.log(`in transit: ${payload.orderID}`)
  // socket.emit('in-transit', payload)
  // socket.emit('delivered', payload)
})

socket.on('delivered', (payload) => {
  console.log('Driver delivered: ', payload.orderID)
  // socket.emit('delivered', payload)
})




function driverLogEvent(payload) {
  console.log(payload)
}

module.exports = driverLogEvent;








// ### Lab 12

// let delivery = {
//   store: 'Best Store',
//   orderID: faker.datatype.uuid(),
//   customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
//   addreess: `${faker.address.city()}, ${faker.address.state()}`,
// }
// let driverPickup = `DRIVER: picked up ${delivery.orderID}`
// let driverDelivered = `DRIVER: delivered ${delivery.orderID}`

// events.on('driver-pickup', (payload) => driverLogEvent( payload))
// events.on('driver-delivered', (payload) => driverLogEvent(payload))

// setInterval(() =>{
//   events.emit('driver-pickup', driverPickup)
//   events.emit('in-transit', delivery)
//   events.emit('driver-delivered', driverDelivered)
// }, 5250)

// setInterval(() =>{
//   events.emit('delivered', delivery)
// }, 5550)


