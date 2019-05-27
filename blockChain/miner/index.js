const bC = require("../controller");
const makeBlock = require("./makeBlock");
const { hash } = require("../crypto");
const { topBlock } = require("../state");

const emitAndReturn = (event, x) => {
  bC.emit(event, x);
  return x;
};

function mineBlock(body = []) {
  let nonce = 0;
  let block = linkBlock(makeBlock({ nonce, body }));
  while (!checkBlock(block)) {
    ++nonce;
    block = linkBlock(makeBlock({ nonce, body }));
  }
  return emitAndReturn("block-created", block);
}

function linkBlock(block) {
  block.hash = hash(JSON.stringify(block.head));
  return block;
}

function checkBlock(block) {
  return (
    hash(JSON.stringify(block.head)) === block.hash &&
    block.hash.slice(0, topBlock.head.difficulty.length) ===
      topBlock.head.difficulty
  );
}

module.exports = mineBlock;
