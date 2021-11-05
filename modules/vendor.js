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
  console.log('You have an Item to ship: ', payload.orderID)
})

socket.on('delivered', (payload) => {
  console.log('Delivered:', vendorDelivered)
  process.on('exit', (code) => {
    console.log(`Exiting with code: ${code}`)
  })
})
