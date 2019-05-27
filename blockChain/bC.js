const crypto = require("crypto");
const bC = require("./controller");

const io = require("./io");

const hash = str =>
  crypto
    .createHash("sha256")
    .update(str)
    .digest("hex");

const emitAndReturn = (event, x) => {
  bC.emit(event, x);
  return x;
};

let topBlock = io.readTopBlock();

bC.on("block-created", io.writeBlock);
bC.on("block-written", block => {
  topBlock = block;
});

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

  function mineBlock(body = []) {
    let nonce = 0;
    let block = linkBlock(makeBlock({ nonce, body }));
    while (!checkBlock(block)) {
      ++nonce;
      block = linkBlock(makeBlock({ nonce, body }));
    }
    return emitAndReturn("block-created", block);
  }

  function makeBlock({ body, nonce }) {
    const head = {
      nonce,
      link: topBlock ? topBlock.hash : 0,
      time: Date.now(),
      height: topBlock ? topBlock.head.height + 1 : 0,
      difficulty: genesis.difficulty
    };
    return {
      head,
      body
    };
  }

  function linkBlock(block) {
    block.hash = hash(JSON.stringify(block.head));
    return block;
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

  console.log(`Chain checked and intact: ${verifyAllBlockLinks()}`)
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
