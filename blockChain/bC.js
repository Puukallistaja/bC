const Chain = require("./C");

const genesisMaker = require("./genesis");
const blockMaker = require("./b");

const validator = keys => key => keys.includes(key);
const getPreviousHash = () => (Chain.length ? Chain.slice(-1)[0].hash : "0");

module.exports = () => {
  const genesisBlock = Chain.length
    ? Chain.slice(0, 1)[0]
    : genesisMaker({ validator: validator(["so_security.wow"]) });

  if (!Chain.length) {
    Chain.push(genesisBlock);
  }

  const block = blockMaker(genesisBlock);

  return {
    link: ({ key, body }) => {
      try {
        const newBlock = block({
          key,
          body,
          height: Chain.length,
          previousHash: getPreviousHash()
        });

        if (newBlock) {
          Chain.push(newBlock);
        } else throw Error('Cannot link block')
        
      } catch (why) {
        console.log(why)
      }
    },
    get latestBlock() {
      return Chain.slice(-1)[0];
    },
    get fullChain() {
      return Chain;
    }
  };
};
