'use strict';

const events = require('../util/event-pool.js');
const faker = require('faker');

// delivery variable <- store, orderID, customer, address


// Runs whatever we want to whatever set interval
setInterval(() => {
  let delivery = {
    store: faker.company.companyName(),
    orderID: faker.uuid(),
    customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
    addreess: `${faker.address.city}, ${faker.address.state}`,
  }
  events.emit('pickup', delivery)
}, 5000)

// listen for delivered event => handleDelivery
