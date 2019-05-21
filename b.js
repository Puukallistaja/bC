const crypto = require("crypto");

const hash = str =>
  crypto
    .createHmac("sha256", "shhh")
    .update(str)
    .digest("hex");

const linkToLatestBlock = ({ latestHash, data }) =>
  hash(JSON.stringify({ latestHash, data }))

module.exports = ({ latestHash, data }) => {
  return {
    hash: linkToLatestBlock({ latestHash, data }),
    body: data
  };
};
