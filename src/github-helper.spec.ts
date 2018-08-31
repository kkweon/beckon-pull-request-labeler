import { expect } from "chai";
import { hasLabel, isPRStale } from "./github-helper";
import { GitHubLabel, GitHubPullRequest } from "./models";
const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

describe("isPRStale", () => {
  let stalePR: GitHubPullRequest;

  beforeEach(() => {
    const LONG_TIME_AGO = new Date().getTime() - ONE_DAY_IN_MILLISECONDS * 365;
    const date = new Date();
    date.setTime(LONG_TIME_AGO);
    stalePR = generateMockPR({ created_at: date.toISOString() });
  });

  it("returns true if stale", () => {
    expect(isPRStale(stalePR)).to.be.true;
  });

  it("returns false if not stale", () => {
    expect(isPRStale(generateMockPR({ created_at: new Date().toISOString() })))
      .to.be.false;
  });
});

describe("hasLabel", () => {
  let mockLabel: GitHubLabel;
  let prWithLabel: GitHubPullRequest;
  let prWithoutLabel: GitHubPullRequest;
  beforeEach(() => {
    mockLabel = generateMockLabel({ id: 0 });

    prWithLabel = generateMockPR({ labels: [mockLabel] });
    prWithoutLabel = generateMockPR({ labels: [] });
  });

  it("returns true when PR has the label", () => {
    expect(hasLabel(prWithLabel, mockLabel)).to.be.true;
  });
  it("returns false when PR doesn't have the label", () => {
    expect(hasLabel(prWithoutLabel, mockLabel)).to.be.false;
  });
});

function generateMockPR(payload: object): GitHubPullRequest {
  return {
    ...payload,
  } as GitHubPullRequest;
}

function generateMockLabel(payload: object): GitHubLabel {
  return {
    ...payload,
  } as GitHubLabel;
}
