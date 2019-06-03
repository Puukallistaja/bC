const { hash } = require("../crypto");
const state = require("../state");

function checkBlock(block) {
  let genesis = state.genesis;
  let topBlock = state.topBlock;
  let difficulty = topBlock ? topBlock.head.difficulty : genesis.difficulty;

  return (
    hash(JSON.stringify(block.head)) === block.hash &&
    block.hash.slice(0, difficulty.length) === difficulty
  );
}

module.exports = checkBlock;
