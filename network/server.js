const server = require('http').createServer();
const io = require('socket.io')(server);

const bC = require('../chain/bC')

const genesis = { difficulty: '00000'}
const Stamp = bC({genesis})

io.on('connection', client => {
  console.log('Connection made')
  client.emit('ready', 'to rock')
  client.on('blockData', data => {
    Stamp.mineBlock(data)
    client.emit('block-chained', Stamp.readBlock(Stamp.getHeight()))
    console.log(`Difficulty: ${Stamp.getDifficulty()}`)
    console.log(`Chain intact: ${Stamp.checkAllBlockLinks()}`)
  });
  client.on('disconnect', () => {
    console.log('Connection lost')
  });
});
server.listen(3000);