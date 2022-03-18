/* eslint-disable quotes */
const { expect } = require("chai");

// eslint-disable-next-line no-undef
describe("Maths tests", () => {
  // eslint-disable-next-line no-undef
  it("should equal 2", () => {
    expect(2).to.equal(1 + 1);
  });
  // eslint-disable-next-line no-undef
  it.skip("should NOT equal 2", () => {
    expect(3).to.equal(1 + 1);
  });
});
