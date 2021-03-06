import { GitHubLabel, GitHubPullRequest, GitHubReview } from "./models";

export function hasExtension(filename: string, ext: string): boolean {
  return filename.slice(-ext.length) === ext;
}

export function isFrontEndFile(filename: string): boolean {
  const extensions = [
    "js",
    "ts",
    "jsx",
    "package.json",
    "package-lock.json",
    "tsx",
    "tmpl",
    "html",
    "tpl",
  ];

  return extensions.some(ext => hasExtension(filename, ext));
}

export function isBackEndFile(filename: string): boolean {
  const extensions = ["java", "sql", "thrift"];

  return extensions.some(ext => hasExtension(filename, ext));
}

export function isBackEndFiles(files: string[]): boolean {
  return files.some(isBackEndFile);
}

export function isFrontEndFiles(files: string[]): boolean {
  return files.some(isFrontEndFile);
}

export function hasLabel(
  pullRequest: GitHubPullRequest,
  label: GitHubLabel,
): boolean {
  return !!pullRequest.labels.find(l => l.id === label.id);
}

export function isPRStale(pr: GitHubPullRequest): boolean {
  if (!pr.created_at) {
    throw new Error(`Last updated date is not found in ${pr.url}`);
  }
  // 30 days
  const MAX_DAYS = 30;
  const ONE_DAY = 1000 * 60 * 60 * 24;
  const lastModifiedDate = new Date(pr.created_at).getTime();
  const dateDiff = new Date().getTime() - lastModifiedDate;

  return dateDiff / ONE_DAY >= MAX_DAYS;
}

interface UserIdToReviewState {
  [userId: string]: string;
}

export function extractFinalReviewState(reviews: GitHubReview[]): string[] {
  return Object.values(
    reviews.reduce(
      (acc, review) => {
        acc[review.user.id] = review.state;
        return acc;
      },
      {} as UserIdToReviewState,
    ),
  );
}
