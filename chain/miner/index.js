const bC = require("../bus")
const makeBlock = require("./makeBlock")
const linkBlock = require("./linkBlock")
const { checkBlock } = require("../validator")

const emitAndReturn = (event, x) => {
  bC.emit(event, x)
  return x
}

function mineBlock(body = []) {
  let nonce = 0
  let block = linkBlock(makeBlock({ nonce, body }))
  while (!checkBlock(block)) {
    ++nonce
    block = linkBlock(makeBlock({ nonce, body }))
  }
  return emitAndReturn("block-created", block)
}

module.exports = mineBlock
