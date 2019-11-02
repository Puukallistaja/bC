const bC = require("./bus")
const mineBlock = require("./miner")

const io = require("./io")
const { checkBlockLink, checkAllBlockLinks } = require("./validator")
const state = require("./state")

bC.on("block-created", io.writeBlock)

module.exports = ({
  genesis = {
    name: "JustChain",
    difficulty: "000",
  },
} = {}) => {
  if (!state.topBlock) {
    console.log("Mining the Genesis block")
    bC.emit("initiate-chain", genesis)
    mineBlock()
  } else {
    bC.emit("resume-chain", genesis)
  }

  console.log(`Chain checked and intact: ${checkAllBlockLinks()}`)
  return {
    mineBlock,
    checkBlockLink,
    checkAllBlockLinks,
    readBlock(height) {
      return io.readBlock(height)
    },
    getDifficulty() {
      return state.topBlock.head.difficulty
    },
    getHeight() {
      return state.topBlock.head.height
    },
  }
}
