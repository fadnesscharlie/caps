'use strict';

const faker = require('faker');

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/caps');

const store = 'Harus Cakes';
const parcel = process.argv.splice(2)[0];

let delivery = {
  store: 'Best Store',
  orderID: faker.datatype.uuid(),
  customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
  addreess: `${faker.address.city()}, ${faker.address.state()}`,
}

let vendorDelivered = ` Thank you for delivering ${delivery.orderID}`

// Join
socket.emit('join', store);

// adding new package
socket.emit('pickup', parcel)

socket.on('pickup', (payload) => {
  console.log('You have an Item to ship: ', payload.orderID)
})

// same as pickup
socket.emit('getall');

socket.on('delivered', (payload) => {
  console.log('Delivered:', vendorDelivered)
})

socket.on('added', () => {
  socket.disconnect();
})
