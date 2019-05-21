# bC protocol

## Blocks
### Genesis block
Genesis block contains all configuration for the chain it initiates.
That includes validators, linkers, parsers, contracts.
Genesis block provides SHASUM fingerprints for all external software.
Chain uses only the methods provided in Genesis block.
```const genesis = genesisMaker({
  // configuration
})```
### block
Gets its dependencies from Genesis block
```const block = blockMaker(genesisBlock)```