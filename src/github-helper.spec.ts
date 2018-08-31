import { expect } from "chai";
import {
  hasLabel,
  isPRStale,
  hasExtension,
  isFrontEndFile,
  extractFinalReviewState,
} from "./github-helper";
import { GitHubLabel, GitHubPullRequest, GitHubReview } from "./models";
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

describe("hasExtension", () => {
  it("returns true when it has the extension", () => {
    expect(hasExtension("transformer.json", "json")).to.be.true;
  });

  it("checks temp.json is not front end file", () => {
    expect(isFrontEndFile("temp.json")).to.be.false;
  });

  it("checks package.json is a front end file", () => {
    expect(isFrontEndFile("package.json")).to.be.true;
  });
});

describe("extractFinalReviewState", () => {
  it("returns final review states from GitHubReviews", () => {
    const reviews: GitHubReview[] = [
      generateMockReview({ user: { id: 3 }, state: "CHANGES_REQUESTED" }),
      generateMockReview({ user: { id: 3 }, state: "APPROVED" }),
    ];

    expect(extractFinalReviewState(reviews)).to.deep.equal(["APPROVED"]);
  });

  it("returns a correct even if multiple people", () => {
    const reviews: GitHubReview[] = [
      generateMockReview({ user: { id: 3 }, state: "CHANGES_REQUESTED" }),
      generateMockReview({ user: { id: 10 }, state: "COMMENTED" }),
      generateMockReview({ user: { id: 3 }, state: "APPROVED" }),
    ];

    expect(extractFinalReviewState(reviews).sort()).to.deep.equal(
      ["COMMENTED", "APPROVED"].sort(),
    );
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

function generateMockReview(payload: object): GitHubReview {
  return {
    ...payload,
  } as GitHubReview;
}
