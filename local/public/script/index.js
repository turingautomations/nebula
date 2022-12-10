let socket


const closeHandler = event=>{
  console.log('close', event)
}

const errorHandler = event=>{
  console.log('error', event)
}

const messageHandler = event=>{
  const message = JSON.parse(event.data)

  console.log('message', message)
}

const openHandler = event=>{
  console.log('open', event)
  

  setInterval(() => {
    try {
      const message = JSON.stringify((new Date()).toISOString())

      console.log('sending', message)
      
      socket.send(message)
    } catch (error) {
      console.error(error)
    }
  }, 2345)
}


window.addEventListener('load', event=>{
  socket = new WebSocket('wss://localhost:3000')


  socket.onclose = closeHandler
  socket.onerror = errorHandler
  socket.onmessage = messageHandler
  socket.onopen = openHandler
})