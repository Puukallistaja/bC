const { hash } = require("../crypto")

function linkBlock(block) {
  block.hash = hash(JSON.stringify(block.head))
  return block
}

module.exports = linkBlock
