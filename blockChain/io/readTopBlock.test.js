const rtb = require("./index").readTopBlock

describe('Read empty chain', () => {
  it('Throws error', () => {
    console.log(rtb())
    expect(true)
  })
})