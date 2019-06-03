const bC = require("./controller");
const io = require("./io");

const state = {
  genesis: null,
  topBlock: io.readTopBlock(),
};
bC.on("initiate-chain", genesis => {
  state.genesis = genesis;
});
bC.on("block-written", block => {
  state.topBlock = block;
});

module.exports = {
  get topBlock() {
    return state.topBlock
  },
  get genesis() {
    return state.genesis
  }
}
