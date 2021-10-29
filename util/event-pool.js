'use strict';

const Events = require('events');
const events = new Events;

// Export ONE instance of events that all modules can share
// this is called a ... "singleton"
// Global variable that all events use

module.exports = events;
