import token from "./config";
import {
  beckonGitHubLabelMap,
  BeckonGitHubLabelMapKeys,
  GitHubFile,
  GitHubLabel,
  GitHubPullRequest,
  GitHubResponse,
  GitHubReview,
  GitHubReviewState,
} from "./models";

import github, {
  AuthUserToken,
  GetAllResponseItem,
  IssuesAddLabelsParams,
  IssuesReplaceAllLabelsParams,
  PullRequestsGetReviewsParams,
} from "@octokit/rest";
import {
  extractFinalReviewState,
  isBackEndFiles,
  isFrontEndFiles,
  isPRStale,
} from "./github-helper";
const octokit = new github();

// This is a sync function
octokit.authenticate({
  type: "token",
  token,
} as AuthUserToken);

const owner = "beckon";
const repo = "base";

export async function getAppropriateLabels(
  pr: GetAllResponseItem,
): Promise<GitHubLabel[]> {
  // check if approved
  // check target branch -- production or staging
  // IF not approved
  //   java files -> java label
  //   frontend files -> frontend review label
  //
  const labels: GitHubLabel[] = [];
  const reviewStates = await getReviewStatesFromPR(pr);
  const reviewStateNames = extractFinalReviewState(reviewStates);
  let _isApprovedPR = false;

  const dontMergeLabel = beckonGitHubLabelMap.get(
    BeckonGitHubLabelMapKeys.dontMerge,
  );
  if (dontMergeLabel && pr.labels) {
    if (!!pr.labels.find(l => l.id === dontMergeLabel.id)) {
      labels.push(dontMergeLabel);
    }
  }

  if (await hasMergeConflict(pr as GitHubPullRequest)) {
    const mergeConflictLabel = beckonGitHubLabelMap.get(
      BeckonGitHubLabelMapKeys.mergeConflict,
    );
    if (mergeConflictLabel) {
      labels.push(mergeConflictLabel);
    }
  }

  if (reviewStateNames.includes(GitHubReviewState.APPROVED)) {
    _isApprovedPR = true;

    const goodToMerge = beckonGitHubLabelMap.get(
      BeckonGitHubLabelMapKeys.canBeMerged,
    );
    if (goodToMerge) {
      labels.push(goodToMerge);
    }
  }

  if (reviewStateNames.includes(GitHubReviewState.CHANGES_REQUESTED)) {
    const revisionNeeded = beckonGitHubLabelMap.get(
      BeckonGitHubLabelMapKeys.revisionNeeded,
    );
    if (revisionNeeded) {
      labels.push(revisionNeeded);
    }
  }

  if (pr.base && pr.base.ref === "staging") {
    const stageLabel = beckonGitHubLabelMap.get(
      BeckonGitHubLabelMapKeys.toStage,
    );
    if (stageLabel) {
      labels.push(stageLabel);
    }
  }

  if (pr.base && pr.base.ref === "production") {
    const hotfixLabel = beckonGitHubLabelMap.get(
      BeckonGitHubLabelMapKeys.hotfix,
    );
    if (hotfixLabel) {
      labels.push(hotfixLabel);
    }
  }

  if (_isApprovedPR) {
    return labels;
  }

  if (pr.user && pr.user.login === "beckonbot") {
    if (pr.base && pr.base.ref === "master") {
      const masterLabel = beckonGitHubLabelMap.get(
        BeckonGitHubLabelMapKeys.toMaster,
      );
      if (masterLabel) {
        labels.push(masterLabel);
      }
    }

    return labels;
  }

  // if not approved

  // check if it's stale
  if (isPRStale(pr as GitHubPullRequest)) {
    const abandonedLabel = beckonGitHubLabelMap.get(
      BeckonGitHubLabelMapKeys.abandoned,
    );
    if (abandonedLabel) {
      labels.push(abandonedLabel);
    }
  }

  if (!pr.number) {
    throw new Error(`Error at parsing ${pr.url}`);
  }

  const modifiedFiles = await getPRFiles(pr.number);
  const fileNames = modifiedFiles.map(f => f.filename);

  if (isBackEndFiles(fileNames)) {
    const javaLabel = beckonGitHubLabelMap.get(
      BeckonGitHubLabelMapKeys.javaReviewRequired,
    );
    if (javaLabel) {
      labels.push(javaLabel);
    }
  }

  if (isFrontEndFiles(fileNames)) {
    const frontLabel = beckonGitHubLabelMap.get(
      BeckonGitHubLabelMapKeys.frontEndReivewRequired,
    );
    if (frontLabel) {
      labels.push(frontLabel);
    }
  }

  return labels;
}

export async function getPRFiles(prNumber: number): Promise<GitHubFile[]> {
  return octokit.pullRequests
    .getFiles({ owner, repo, number: prNumber })
    .then((res: GitHubResponse<GitHubFile[]>) => res.data)
    .catch(() => {
      throw new Error(
        `Failed to fetch files for PR: https://github.com/beckon/base/pulls/${prNumber}`,
      );
    });
}

export async function addLabels(
  prNumber: number,
  labels: GitHubLabel[],
): Promise<GitHubLabel[]> {
  const labelNames = labels.map(l => l.name);
  try {
    const response: GitHubResponse<
      GitHubLabel[]
    > = await octokit.issues.addLabels({
      owner,
      repo,
      number: prNumber,
      labels: labelNames,
    } as IssuesAddLabelsParams);
    return handleResponse(response);
  } catch (err) {
    throw new Error(
      `Failed to Add ${labelNames} to https://github.com/beckon/base/pulls/${prNumber}`,
    );
  }
}

function handleResponse(response: any) {
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(`Response received: ${JSON.stringify(response, null, 4)}`);
  }
}

export async function getReviewStatesFromPR(
  pr: GetAllResponseItem,
): Promise<GitHubReview[]> {
  try {
    const result: GitHubResponse<
      GitHubReview[]
    > = await octokit.pullRequests.getReviews({
      owner,
      repo,
      number: pr.number,
    } as PullRequestsGetReviewsParams);
    return result.data;
  } catch (_) {
    throw new Error(`Unable to fetch PR reviews for ${pr.html_url}`);
  }
}

export async function isApprovedPR(pr: GitHubPullRequest): Promise<boolean> {
  try {
    const reviews = await getReviewStatesFromPR(pr);
    return reviews.some(r => r.state === GitHubReviewState.APPROVED);
  } catch (_) {
    // FIXME more robust error handling
    throw new Error(`Unable to fetch PR reviews for ${pr.html_url}`);
  }
}

export async function replaceAllLabels(
  pr: GitHubPullRequest,
  labels: GitHubLabel[],
): Promise<GitHubLabel> {
  const labelNames = labels.map(l => l.name);
  try {
    const response: GitHubResponse<
      GitHubLabel[]
    > = await octokit.issues.replaceAllLabels({
      owner,
      repo,
      number: pr.number,
      labels: labelNames,
    } as IssuesReplaceAllLabelsParams);
    return handleResponse(response);
  } catch (_) {
    throw new Error(`Failed replace labels with ${labelNames} to ${pr.url}`);
  }
}

export async function hasMergeConflict(
  pr: GitHubPullRequest,
): Promise<boolean> {
  try {
    const response = await octokit.pullRequests.get({
      owner,
      repo,
      number: pr.number,
    });
    return response.data.mergeable === false;
  } catch (_) {
    throw new Error(`Unable to check if the PR is mergable: ${pr.html_url}`);
  }
}

octokit.pullRequests.getAll({ owner, repo }).then(async res => {
  const pullRequests = res.data;

  if (!pullRequests) {
    throw new Error("No pr is found");
  }

  const rightLabelsOfPromises = await Promise.all(
    pullRequests.map(getAppropriateLabels),
  );

  const updatePromise = [];
  for (let i = 0; i < rightLabelsOfPromises.length; ++i) {
    const appropriateLabels = rightLabelsOfPromises[i];
    const pr = pullRequests[i];
    printPR(appropriateLabels, pr as GitHubPullRequest);

    if (process.argv[2] === "update") {
      updatePromise.push(
        replaceAllLabels(pr as GitHubPullRequest, appropriateLabels),
      );
    }
  }

  if (process.argv[2] === "update") {
    await Promise.all(updatePromise);
  }
});

function printPR(labels: GitHubLabel[], pr: GitHubPullRequest) {
  /* tslint:disable */
  console.log("=".repeat(40));
  console.log(pr.title);
  console.log(pr.html_url);
  console.log("=".repeat(40));
  console.log(labels.map(l => l.name).join("\n"));
  console.log("\n\n");
  /* tslint:enable */
}
