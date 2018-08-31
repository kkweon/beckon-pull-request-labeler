import { expect } from "chai";

describe("config", () => {
  it("should have GITHUB_TOKEN", () => {
    expect(process.env.GITHUB_TOKEN).to.exist;
  });
});
