const checkBlock = require("./checkBlock")

function checkBlockLink(lower, higher) {
  return (
    lower.hash === higher.head.link &&
    [lower, higher].map(block => checkBlock(block)).every((check, ix) => check)
  )
}

module.exports = checkBlockLink
