const fs = require("fs");
const fsAsync = fs.promises;
const bC = require("../controller");

const __dir = "./blockChain/DATA/blocks/";

function writeBlock(block) {
  try {
    fs.writeFileSync(
      __dir + block.head.height + ".json",
      JSON.stringify(block)
    );
    bC.emit("block-written", block);
  } catch (error) {
    throw error;
  }
}

function readBlockList() {
  try {
    const blockList = fs.readdirSync(__dir);
    return blockList.length
      ? blockList.sort((x, y) => x.split(".")[0] - y.split(".")[0])
      : false;
  } catch (error) {
    throw error;
  }
}

function readBlock(height) {
  try {
    var block = JSON.parse(fs.readFileSync(__dir + height + ".json", "utf8"));
    return block || false;
  } catch (error) {
    throw error;
  }
}

function readTopBlock() {
  try {
    const blockList = readBlockList();
    if (blockList) {
      var topBlockFileName = blockList.slice(-1)[0];
      var topBlock = JSON.parse(
        fs.readFileSync(__dir + topBlockFileName, "utf8")
      );
    }
    return topBlock || false;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  writeBlock,
  readBlock,
  readTopBlock,
  readBlockList
};
