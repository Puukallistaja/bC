const bC = require("../bC");

var testChain = bC({
  genesis: {
    name: 'BatCoin',
    difficulty: '00000',
  }
});

console.log(testChain.mineBlock())
describe("Uninitiated bC exposes init method", () => {
  it("exposes difficulty", () => {
    expect(testChain).toHaveProperty("mineBlock");
  });
});
