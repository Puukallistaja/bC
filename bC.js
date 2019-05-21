const block = require('./b')
const Chain = require('./C')

const validateData = x => x
const getLatestHash = () => Chain.length ? Chain.slice(-1)[0].hash : '0'

module.exports = () => {
  Chain.push({

  })
  return {
    link: data => Chain.push(block({
      latestHash: getLatestHash(),
      data: validateData({data})
    })),
    get latestBlock() {
      return Chain.slice(-1)[0]
    },
    get fullChain() {
      return Chain
    }
  }
}