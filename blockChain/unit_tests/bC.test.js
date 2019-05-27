const bC = require("../bC");

const genesisConf = {
  name: 'TestChain',
  difficulty: '000',
}
const testChain = bC({
  genesis: genesisConf
});

const freshBlock = testChain.mineBlock()


describe("Chain exposes expected methods", () => {
  it("exposes miner function", () => {
    expect(testChain).toHaveProperty("mineBlock");
    expect(testChain.mineBlock).toBeInstanceOf(Function);
  });
  it("exposes getDifficulty function", () => {
    expect(testChain).toHaveProperty("getDifficulty");
    expect(testChain.getDifficulty).toBeInstanceOf(Function);
  });
  it("exposes readBlock function", () => {
    expect(testChain).toHaveProperty("readBlock");
    expect(testChain.readBlock).toBeInstanceOf(Function);
  });
});

describe("A freshly mined block", () => {
  it("is an object", () => {
    expect(freshBlock).toBeInstanceOf(Object);
  });
  it("has correct difficulty", () => {
    expect(freshBlock.head.difficulty).toBe(genesisConf.difficulty);
  });
});

describe("Block fetching", () => {
  it("fetches requested block", () => {
    expect(testChain.readBlock(0)).toBeInstanceOf(Object);
  });
  it("has correct difficulty", () => {
    expect(freshBlock.head.difficulty).toBe(genesisConf.difficulty);
  });
});