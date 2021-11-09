'use strict';

// require (socket)(port)
const io = require('socket.io')(3000);
const uuid = require('uuid').v4;

// on connection -> console log that connection
io.on('connection', (socket) => {
  console.log('Welcome to CORE', socket);
})

// lets create the namespace 'caps'
const caps = io.of('/caps');
const queue = { shipments: {} }

// on connection to caps
caps.on('connection', (socket) => {
  // console log the connection
  console.log('Welcome to CAPS', socket.id);

  // join the room
  socket.on('join', room => {
    console.log(`Created Room: ${room}`)
    socket.join(room);
  })

  // pick up event
  // Locally picks up socket
  socket.on('pickup', (parcel) => {
    logger('pickup', parcel);
    // set messsageID to uuid
    let parcelID = uuid();
    // to the queue
    // in the message queue @ 'pickup', driver, mesage = message.payload
    queue.shipments[parcelID] = parcel
    // console.log('queue ',queue)

    socket.emit('added');

    caps.emit('shipment', { parcelID, parcel })

    // messages['pickup']['driver'][messageID] = message.payload

    //to driver for rooms
    // io.in('driver').emit('pickup', {messageID, payload: messages.payload})

    // Hub/everywhere picks up cap
    // caps.emit('pickup', parcel)
  })

  socket.on('getall', () => {
    console.log('Get All')
    Object.keys(queue.shipments).forEach(id => {
      socket.emit('shipment', 
      { id, parcel: queue.shipments[id] })
    })
  })

  socket.on('recieved', message => {
    console.log('Package was recieved', message)
    delete queue.shipments[message.id]
  })
  
  // in-transit event
  socket.on('in-transit', (payload) => {
    logger('in-transit', payload);
    caps.emit('in-transit', payload)
  })
  
  // delivered event
  socket.on('delivered', (payload) => {
    logger('delivered', payload);
    caps.emit('delivered', payload)
    
  })
})

function logger(event, payload) {
  let time = new Date();
  console.log('Logger ----------')
  console.log({time, event, payload})
}
