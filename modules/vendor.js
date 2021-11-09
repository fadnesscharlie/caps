'use strict';

const faker = require('faker');

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/caps');

const store = 'Harus Cakes';
const parcel = process.argv[2];

let delivery = {
  store: 'Best Store',
  orderID: faker.datatype.uuid(),
  customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
  addreess: `${faker.address.city()}, ${faker.address.state()}`,
}

let vendorDelivered = ` Thank you for delivering ${delivery.orderID}`

socket.emit('join', store);


socket.on('pickup', (payload) => {
  console.log('You have an Item to ship: ', payload.orderID)
  socket.emit('new parcel', parcel)
})

// same as pickup

socket.on('delivered', (payload) => {
  console.log('Delivered:', vendorDelivered)
  socket.emit('getall');
})

socket.on('added', () => {
  socket.disconnect();
})
