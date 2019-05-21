const crypto = require("crypto");

const hash = str =>
  crypto
    .createHmac("sha256", "shhh")
    .update(str)
    .digest("hex");

const linkToLatestBlock = ({ previousHash, height, body, time, key }) =>
  hash(
    JSON.stringify({
      previousHash,
      body,
      time,
      height,
      key
    })
  );

const linker = ({ previousHash, height, body, key }) => {
  const time = JSON.stringify(Date.now());

  return {
    time,
    body,
    height,
    hash: linkToLatestBlock({ previousHash, height, body, time, key })
  };
};

module.exports = genesisBlock => {
  const validate = genesisBlock.validator;

  return ({ key, body, height, previousHash }) => {
    if (validate(key)) {
      return linker({
        key,
        body,
        height,
        previousHash
      });
    } else throw Error(`Not authorized. Key <${key}> does not match.`);
  };
};
