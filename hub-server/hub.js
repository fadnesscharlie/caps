'use strict';

// require (socket)(port)
const io = require('socket.io')(3000);

// on connection -> console log that connection
io.on('connection', (socket) => {
  console.log('Welcome to CORE', socket);
})

// lets create the namespace 'caps'
const caps = io.of('/caps');

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
  socket.on('pickup', (payload) => {
    logger('pickup', payload);

    // Hub/everywhere picks up cap
    caps.emit('pickup', payload)
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
