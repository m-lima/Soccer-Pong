export default class Socket {
  connect(channel, receive) {
    if (this.socket) {
      console.error('connection already established')
      return
    }

    console.log('connecting to channel', channel)
    this.socket = new WebSocket('ws://' + window.location.host + '/socket/' + channel)
    this.socket.onmessage = receive
  }

  send(msg) {
    if (this.socket) {
      this.socket.send(JSON.stringify(msg))
    }
  }
}
