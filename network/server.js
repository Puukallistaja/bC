const server = require('http').createServer();
const io = require('socket.io')(server);

const bC = require('../chain/bC')

const Stamp = bC()

io.on('connection', client => {
  console.log('Connection made')
  client.emit('ready', 'to rock')
  client.on('blockData', data => {
    Stamp.link(data)
    console.log(Stamp.latestBlock)
  });
  client.on('disconnect', () => {
    console.log('Connection lost')
  });
});
server.listen(3000);