'use strict';

const faker = require('faker');

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/caps');
const process = require('process');

const store = 'Harus Cakes';

let delivery = {
  store: 'Best Store',
  orderID: faker.datatype.uuid(),
  customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
  addreess: `${faker.address.city()}, ${faker.address.state()}`,
}

let vendorDelivered = ` Thank you for delivering ${delivery.orderID}`

socket.emit('join', store);

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

socket.on('delivered', (payload) => {
  // setTimeout(() => {
  //   console.log('delivered', payload)
  //   socket.emit('delivered', vendorDelivered)
  //   process.on('exit', (code) => {
  //     console.log(`Exiting with code: ${code}`)
  //   })
  // }, 5000)

  console.log('Delivered:', vendorDelivered)
  // console.log('delivered', payload)
    // socket.emit('delivered', vendorDelivered)
    // process.on('exit', (code) => {
    //   console.log(`Exiting with code: ${code}`)
    // })
  
  
})


//  ### Trigger event!!

// setInterval(() => {
//   let delivery = {
//     store: 'Best Store',
//     orderID: faker.datatype.uuid(),
//     customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
//     addreess: `${faker.address.city()}, ${faker.address.state()}`,
//   }
//   socket.emit('pickup', delivery)
// }, 15000)





// ### lab 12 end

// MODELS
// events.on('pickup', (payload) => logEvent('pickup', payload))
// events.on('in-transit', (payload) => logEvent('in-transit', payload))
// events.on('delivered', (payload) => logEvent('delivered', payload))
// events.on('vendor-delivered', (payload) => vendorLogEvent( payload))





// setInterval(() => {
//   events.emit('pickup', delivery)
// }, 5000)

// setInterval(() => {
//   events.emit('vendor-delivered', vendorDelivered)
// }, 5500)

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

