# bC protocol

### initiate / resume 
```
// in root
const bC = require('./chain/bC)
const chainInstance = bC({
  name: 'TestChain',
  difficulty: '0000'
})
```
### miner
```
// body - Array of data to be chained.
chainInstance.mineBlock(body)
```