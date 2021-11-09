'use strict';

// connection to socket io as a client
const io = require('socket.io-client');

// connect to the hub
const socket = io.connect('http://localhost:3000/caps');


socket.on('shipment', message => {
  console.log('I have to get this package', message.parcel);
  socket.emit('recieved', message)
})


socket.on('pickup', (payload) => {
  console.log('Driver picked up: ', payload.orderID)
  socket.emit('getall');
  socket.emit('recieved', payload)
})
  
socket.on('in-transit', (payload) => {
  console.log(`Driver has ${payload.orderID} in transit`)
})

socket.on('delivered', (payload) => {
  console.log('Driver has delivered: ', payload.orderID)
})
