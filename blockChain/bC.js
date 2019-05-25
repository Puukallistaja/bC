const crypto = require("crypto");

const hash = str =>
  crypto
    .createHash("sha256")
    .update(str)
    .digest("hex");

module.exports = ({
  genesis = {
    name: "Batcoin",
    difficulty: 3
  }
} = {}) => {
  const genesisBlock = linkBlock(
    makeBlock({
      head: {
        link: 0,
        time: Date.now(),
        height: 0,
        difficulty: 3
      },
      txs: []
    })
  ).blockJSON;

  const Chain = [genesisBlock];
  const txs = ["a", "b"];

  const tip = () => JSON.parse(Chain.slice(-1)[0]);

  function mineBlock() {
    let nonce = 0;
    let block = linkBlock(makeBlock({ nonce, body: txs.slice(0, 2) }));
    while (!checkBlock(block)) {
      ++nonce;
      block = linkBlock(makeBlock({ nonce, body: txs.slice(0, 2) }));
    }
    console.log(block);
  }

  function makeBlock({
    body,
    nonce,
    head = {
      link: tip().hash,
      time: Date.now(),
      height: ++tip().head.height,
      difficulty: tip().head.difficulty
    }
  } = {}) {
    return {
      head: {
        nonce,
        ...head
      },
      body
    };
  }

  function linkBlock(block) {
    block.hash = hash(JSON.stringify(block.head));

    return {
      block,
      blockJSON: JSON.stringify(block)
    };
  }
  function checkBlock({ block, blockJSON }) {
    return (
      hash(JSON.stringify(block.head)) === block.hash &&
      block.hash.slice(0, genesis.difficulty.length) === genesis.difficulty
    );
  }
  function chainBlock(block) {
    Chain.push(block);
  }

  return {
    mineBlock,
    checkBlock
  };
};
