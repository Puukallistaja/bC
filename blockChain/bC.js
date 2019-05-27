const bC = require("./controller");
const mineBlock = require("./miner");

const io = require("./io");
const { hash } = require("./crypto");
const { topBlock } = require("./state");

bC.on("block-created", io.writeBlock);

module.exports = ({
  genesis = {
    name: "Batcoin",
    difficulty: "000"
  }
} = {}) => {
  if (!topBlock) {
    console.log("No top block. Mining the Genesis block");
    mineBlock();
  }

  function checkBlock(block) {
    return (
      hash(JSON.stringify(block.head)) === block.hash &&
      block.hash.slice(0, genesis.difficulty.length) === genesis.difficulty
    );
  }

  function verifyBlockLink(lower, higher) {
    return (
      lower.hash === higher.head.link &&
      [lower, higher]
        .map(block => checkBlock(block))
        .every((check, ix) => check)
    );
  }

  function verifyAllBlockLinks() {
    try {
      return io.readBlockList().reduce((lower, higher, ix, list) => {
        const x = lower.split(".")[0];
        const y = higher.split(".")[0];
        const lowerBlock = io.readBlock(x);
        const higherBlock = io.readBlock(y);
        if (!verifyBlockLink(lowerBlock, higherBlock)) {
          throw new Error(`Chain is broken between block ${x} and ${y}`);
        }
        return ix + 1 === list.length ? true : higher;
      });
    } catch (error) {
      throw error;
    }
  }

  console.log(`Chain checked and intact: ${verifyAllBlockLinks()}`);
  return {
    mineBlock,
    verifyBlockLink,
    verifyAllBlockLinks,
    readBlock(height) {
      return io.readBlock(height);
    },
    getDifficulty() {
      return topBlock.head.difficulty;
    },
    getHeight() {
      return topBlock.head.height;
    }
  };
};
