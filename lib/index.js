import Socket from './sockets'
import lexvue from './vue'
var socket = new Socket()
socket.initSocket(() => console.log('init'))
