const io = require("../io");
const checkBlockLink = require("./checkBlockLink");

function checkAllBlockLinks() {
  try {
    const blockList = io.readBlockList();
    return blockList
      ? blockList.reduce((lower, higher, ix, list) => {
          const x = lower.split(".")[0];
          const y = higher.split(".")[0];
          const lowerBlock = io.readBlock(x);
          const higherBlock = io.readBlock(y);
          if (!checkBlockLink(lowerBlock, higherBlock)) {
            throw new Error(`Chain is broken between block ${x} and ${y}`);
          }
          return ix + 1 === list.length ? true : higher;
        })
      : 'Chain not initiated';
  } catch (error) {
    throw error;
  }
}

module.exports = checkAllBlockLinks;
