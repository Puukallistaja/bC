const crypto = require("crypto");

const hash = str =>
  crypto
    .createHmac("sha256", "shhh")
    .update(str)
    .digest("hex");

const linkToLatestBlock = ({ latestHash, height, data, time }) =>
  hash(
    JSON.stringify({
      latestHash,
      data,
      time,
      height
    })
  );

module.exports = ({ latestHash, currentHeight, data }) => {
  const time = JSON.stringify(Date.now());
  const height = currentHeight
  return {
    time,
    height,
    hash: linkToLatestBlock({ latestHash, height, data, time }),
    body: data
  };
};
