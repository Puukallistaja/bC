const state = require("../state");

function makeBlock({ body, nonce }) {
  let genesis = state.genesis;
  let topBlock = state.topBlock;
  let difficulty = topBlock ? topBlock.head.difficulty : genesis.difficulty;

  const head = {
    nonce,
    link: topBlock ? topBlock.hash : 0,
    time: Date.now(),
    height: topBlock ? topBlock.head.height + 1 : 0,
    difficulty
  };
  return {
    head,
    body
  };
}

module.exports = makeBlock;
