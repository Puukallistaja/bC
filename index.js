const blockChain = require('./chain/bC')

const example = blockChain({
  name: 'TestChain',
  difficulty: '000',
})

const data1 = 'fox jumps over lazy dog'
const data2 = 'dog jumps over lazy fox'
const data3 = 'nobody jumps over nobody'

example.mineBlock([data1, data2, data3])
