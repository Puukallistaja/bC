const { topBlock } = require("../state");

function makeBlock({ body, nonce }) {
  const head = {
    nonce,
    link: topBlock ? topBlock.hash : 0,
    time: Date.now(),
    height: topBlock ? topBlock.head.height + 1 : 0,
    difficulty: topBlock.head.difficulty
  };
  return {
    head,
    body
  };
}

module.exports = makeBlock;
