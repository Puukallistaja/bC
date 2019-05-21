const blockChain = require('./bC')

const example = blockChain()

const data1 = 'fox jumps over lazy dog'
const data2 = 'dog jumps over lazy fox'
const data3 = 'nobody jumps over nobody'

console.log(example.link(data1))
// console.log(example.latestBlock)
console.log(example.fullChain)

console.log(example.link(data2))
// console.log(example.latestBlock)
console.log(example.fullChain)

console.log(example.link(data3))
// console.log(example.latestBlock)
console.log(example.fullChain)
  