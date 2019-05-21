const block = require('./b')
const Chain = require('./C')

const validateData = x => x
const getLatestHash = () => Chain.length ? Chain.slice(-1)[0].hash : '0'
const stringifyChainMethod = method => ""+method

const genesisBlock = {
  hash: 0,
  validator: stringifyChainMethod(validateData),
}

module.exports = () => {
  if (!Chain.length) { Chain.push(genesisBlock) }

  const validate = eval(genesisBlock.validator)
  
  return {
    link: data => Chain.push(block({
      latestHash: getLatestHash(),
      data: validate({data})
    })),
    get latestBlock() {
      return Chain.slice(-1)[0]
    },
    get fullChain() {
      return Chain
    }
  }
}