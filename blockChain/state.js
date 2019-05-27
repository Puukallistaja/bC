const bC = require("./controller");
const io = require("./io");

let topBlock = io.readTopBlock();

bC.on("block-written", block => {
  topBlock = block;
});

module.exports = {
  topBlock
};
