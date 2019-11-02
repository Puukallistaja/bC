# bC protocol

### initiate / resume

```
// in root
const bC = require('./chain/bC)
const chainInstance = bC({
  name: 'TestChain',
  difficulty: '0000'
})

/*
* Mines and chains a new block
*
* @body Array - array of data to be chained (i.e. transactions)
* @return Object - freshly mined block
*
*/
chainInstance.mineBlock(body)

/*
* Checks if hash-link is valid between two subsequent objects
*
* @lower Object - lower block as object
* @higher Object - higher block as object
* @return Boolean
*
*/
chainInstance.checkBlockLink(lower, higher)

/*
* Checks all hash-links starting from genesis block
*
* @return Boolean
*
*/
chainInstance.checkAllBlockLinks()

/*
* Reads a block from given height
*
* @height Number
* @return Boolean
*
*/
chainInstance.readBlock(height)

/*
* Exposes latest chain difficulty
*
* @return Boolean
*
*/
chainInstance.checkAllBlockLinks()

/*
* Exposes chain height
*
* @return Number
*
*/
chainInstance.getHeight()
```
