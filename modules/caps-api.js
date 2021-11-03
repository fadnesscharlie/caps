'use strict';

const io = require('socket.io-client');
const express = require('express');
const cors = require('cors');
const faker = require('faker');

const socket = io.connect('http://localhost:3000/caps');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

const PORT = process.env.PORT || 3001;

let delivery = {
  store: 'Best Store',
  orderID: faker.datatype.uuid(),
  customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
  addreess: `${faker.address.city()}, ${faker.address.state()}`,
}

app.post('/pickup', (req, res) => {
  // post request from postman with req.body
  if(JSON.stringify(req.body) === '{}') {
    req.body = delivery
  }
  socket.emit('pickup', req.body)
  // socket.emit('pickup', req.body.store);
  res.status(200).send(`Scheduled Delivery for ${req.body}`)
})

app.post('/in-transit', (req, res) => {
  // post request from postman with req.body
  if(JSON.stringify(req.body) === '{}') {
    req.body = delivery
  }
  socket.emit('in-transit', req.body)
  // socket.emit('pickup', req.body.store);
  res.status(200).send(`In transit: ${req.body}`)
})

app.post('/delivered', (req, res) => {
  // post request from postman with req.body
  if(JSON.stringify(req.body) === '{}') {
    req.body = delivery
  }
  socket.emit('delivered', req.body)
  // socket.emit('pickup', req.body.store);
  res.status(200).send(`Delivered ${req.body}`)
})

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`)
})

