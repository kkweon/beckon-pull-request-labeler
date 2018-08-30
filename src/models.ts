import {
  GetAllResponseItem,
  GetAllResponseItemAssigneesItem,
  GetAllResponseItemLabelsItem,
  GetAllResponseItemLinks,
  GetAllResponseItemMilestone,
  GetReviewsResponseItem,
  Response,
} from "@octokit/rest";

export interface GitHubLabel extends GetAllResponseItemLabelsItem {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
}

export type GitHubResponse<T> = Response<T>;

export interface GitHubResponseHeader {
  "access-control-allow-origin": string;
  "access-control-expose-headers": string;
  "cache-control": string;
  connection: string;
  "content-encoding": string;
  "content-security-policy": string;
  "content-type": string;
  date: string;
  etag: string;
  "referrer-policy": string;
  server: string;
  status: string;
  "strict-transport-security": string;
  "transfer-encoding": string;
  vary: string;
  "x-accepted-oauth-scopes": string;
  "x-content-type-options": string;
  "x-frame-options": string;
  "x-github-media-type": string;
  "x-github-request-id": string;
  "x-oauth-scopes": string;
  "x-ratelimit-limit": string;
  "x-ratelimit-remaining": string;
  "x-ratelimit-reset": string;
  "x-runtime-rack": string;
  "x-xss-protection": string;
}

export interface GitHubUser {
  login: string; // 'kkweon',
  id: number; // 2981167,
  node_id: string; // 'MDQ6VXNlcjI5ODExNjc=',
  avatar_url: string; // 'https://avatars3.githubusercontent.com/u/2981167?v=4',
  gravatar_id: string; // '',
  url: string; // 'https://api.github.com/users/kkweon',
  html_url: string; // 'https://github.com/kkweon',
  followers_url: string; // 'https://api.github.com/users/kkweon/followers',
  following_url: string; // 'https://api.github.com/users/kkweon/following{/other_user}',
  gists_url: string; // 'https://api.github.com/users/kkweon/gists{/gist_id}',
  starred_url: string; // 'https://api.github.com/users/kkweon/starred{/owner}{/repo}',
  subscriptions_url: string; // 'https://api.github.com/users/kkweon/subscriptions',
  organizations_url: string; // 'https://api.github.com/users/kkweon/orgs',
  repos_url: string; // 'https://api.github.com/users/kkweon/repos',
  events_url: string; // 'https://api.github.com/users/kkweon/events{/privacy}',
  received_events_url: string; // 'https://api.github.com/users/kkweon/received_events',
  type: string; // 'User',
  site_admin: boolean; // false
}

export interface GitHubPullRequest extends GetAllResponseItem {
  url: string; // 'https://api.github.com/repos/Beckon/base/pulls/12241',
  id: number; // 193699491,
  node_id: string; // 'MDExOlB1bGxSZXF1ZXN0MTkzNjk5NDkx',
  html_url: string; // 'https://github.com/Beckon/base/pull/12241',
  diff_url: string; // 'https://github.com/Beckon/base/pull/12241.diff',
  patch_url: string; // 'https://github.com/Beckon/base/pull/12241.patch',
  issue_url: string; // 'https://api.github.com/repos/Beckon/base/issues/12241',
  number: number; // 12241,
  state: string; // 'open',
  locked: boolean; // false,
  title: string; // 'BASE-14883  "exclude dimensions" should say "search metrics"',
  user: GitHubUser;
  body: string; // '## Summary\r\n- ESLINT - ES2018\r\n- UberDropdown has a search `<input />`. It uses a placeholder called "searchGhostText" for that input\r\n- Allow to pass down text placeholders from filterButtonWrapper\r\n- [Diagram](https://beckon.atlassian.net/secure/attachment/52383/filter-button.png)\r\n\r\n## Jira Ticket\r\nhttps://beckon.atlassian.net/browse/BASE-14883?filter=23870',
  created_at: string; // '2018-06-08T19:09:47Z',
  updated_at: string; // '2018-08-08T22:13:10Z',
  closed_at: null;
  merged_at: string | undefined;
  merge_commit_sha: string; // 'c0eb2d8021ae99a5c6b9a6ed4553de7c3bc38a73',
  assignee: GetAllResponseItemAssigneesItem;
  assignees: GitHubUser[];
  requested_reviewers: GitHubUser[];
  requested_teams: GitHubUser[];
  labels: GitHubLabel[];
  milestone: GetAllResponseItemMilestone;
  commits_url: string; // 'https://api.github.com/repos/Beckon/base/pulls/12241/commits',
  review_comments_url: string; // 'https://api.github.com/repos/Beckon/base/pulls/12241/comments',
  review_comment_url: string; // 'https://api.github.com/repos/Beckon/base/pulls/comments{/number}',
  comments_url: string; // 'https://api.github.com/repos/Beckon/base/issues/12241/comments',
  statuses_url: string; // 'https://api.github.com/repos/Beckon/base/statuses/7fc3294b2fd5a0be338b8210e285c8f4e7789319',
  head: GitHubCommit;
  base: GitHubCommit;
  _links: GitHubLink;
  author_association: string; // 'CONTRIBUTOR'
}

export interface GitHubCommit {
  label: string; // 'Beckon:master';
  ref: string; // 'master';
  sha: string; // '18c7df92fd6b3cf1e43e38c8394db8e5506c2a92';
  user: GitHubUser;
  repo: GitHubRepo;
}

export type GitHubLink = GetAllResponseItemLinks;

export interface GitHubFile {
  sha: string; // '505715776e2be101ebe5511a2397a978691fc670',
  filename: string; // 'webapp/webapp-web/src/main/resources/com/beckon/steel/quickstart/common/directive/transformerSelector.tmpl',
  status: string; // 'modified',
  additions: number; // 10,
  deletions: number; // 3,
  changes: number; // 13,
  blob_url: string; // 'https://github.com/Beckon/base/blob/7fc3294b2fd5a0be338b8210e285c8f4e7789319/webapp/webapp-web/src/main/resources/com/beckon/steel/quickstart/common/directive/transformerSelector.tmpl',
  raw_url: string; // 'https://github.com/Beckon/base/raw/7fc3294b2fd5a0be338b8210e285c8f4e7789319/webapp/webapp-web/src/main/resources/com/beckon/steel/quickstart/common/directive/transformerSelector.tmpl',
  contents_url: string; // 'https://api.github.com/repos/Beckon/base/contents/webapp/webapp-web/src/main/resources/com/beckon/steel/quickstart/common/directive/transformerSelector.tmpl?ref=7fc3294b2fd5a0be338b8210e285c8f4e7789319',
  patch: string; // '@@ -1,8 +1,15 @@\n <div>\n     <div class="c-flex--center--align">\n-        <custom-spinner visible="spinner" custom-spinner-class="beckon-spinner-small-graphic"  additional-classes="no-animation"></custom-spinner>\n-        <single-select-uber-dropdown ng-if="transformerMenu" class="c=item" menu="transformerMenu" selection="transformer"\n-                                     selection-cb="updateTransformer" button-theme="buttonTheme" starter-text="selectionDisplay">\n+        <custom-spinner visible="spinner"\n+                        custom-spinner-class="beckon-spinner-small-graphic"\n+                        additional-classes="no-animation"></custom-spinner>\n+        <single-select-uber-dropdown ng-if="transformerMenu"\n+                                     class="c=item"\n+                                     menu="transformerMenu"\n+                                     selection="transformer"\n+                                     selection-cb="updateTransformer"\n+                                     button-theme="buttonTheme"\n+                                     uber-text-placeholder="uberTextPlaceholder">\n         </single-select-uber-dropdown>\n         <div ng-if="transformer.name === \'MappingTransformer\'">\n             (Default)'
}

export enum BeckonGitHubLabelMapKeys {
  toMaster = "toMaster",
  toStage = "toStage",
  blockerForRelease = "blockerForRelease",
  dontMerge = "dontMerge",
  hotfix = "hotfix",
  abandoned = "abandoned",
  canBeMerged = "canBeMerged",
  featureTesting = "featureTesting",
  frontEndReivewRequired = "frontEndReivewRequired",
  javaReviewRequired = "javaReviewRequired",
  mergeConflict = "mergeConflict",
  revisionNeeded = "revisionNeeded",
}

export const beckonGitHubLabelMap: Map<string, GitHubLabel> = new Map<
  string,
  GitHubLabel
>(
  Object.entries({
    toMaster: {
      id: 949788362,
      node_id: "MDU6TGFiZWw5NDk3ODgzNjI=",
      url: "https://api.github.com/repos/Beckon/base/labels/%3E%3E%20Master",
      name: ">> Master",
      color: "1d76db",
      default: false,
      description: "",
    },
    toStage: {
      id: 934086909,
      node_id: "MDU6TGFiZWw5MzQwODY5MDk=",
      url: "https://api.github.com/repos/Beckon/base/labels/%3E%3E%20Stage",
      name: ">> Stage",
      color: "93e8f9",
      default: false,
      description: "",
    },
    blockerForRelease: {
      id: 910449906,
      node_id: "MDU6TGFiZWw5MTA0NDk5MDY=",
      url:
        "https://api.github.com/repos/Beckon/base/labels/Blocker%20for%20the%20release%20:cry:",
      name: "Blocker for the release :cry:",
      color: "c2e0c6",
      default: false,
      description: "",
    },
    dontMerge: {
      id: 602662395,
      node_id: "MDU6TGFiZWw2MDI2NjIzOTU=",
      url: "https://api.github.com/repos/Beckon/base/labels/Don't%20Merge",
      name: "Don't Merge",
      color: "b60205",
      default: false,
      description: "",
    },
    hotfix: {
      id: 308361782,
      node_id: "MDU6TGFiZWwzMDgzNjE3ODI=",
      url: "https://api.github.com/repos/Beckon/base/labels/Hotfix",
      name: "Hotfix",
      color: "fbca04",
      default: false,
      description: "",
    },
    abandoned: {
      id: 949884376,
      node_id: "MDU6TGFiZWw5NDk4ODQzNzY=",
      url:
        "https://api.github.com/repos/Beckon/base/labels/Status:%20Abandoned%20:x:",
      name: "Status: Abandoned :x:",
      color: "000000",
      default: false,
      description: "",
    },
    canBeMerged: {
      id: 949881834,
      node_id: "MDU6TGFiZWw5NDk4ODE4MzQ=",
      url:
        "https://api.github.com/repos/Beckon/base/labels/Status:%20Can%20be%20merged%20:ok_woman:",
      name: "Status: Can be merged :ok_woman:",
      color: "00ff00",
      default: false,
      description: "",
    },
    featureTesting: {
      id: 968245966,
      node_id: "MDU6TGFiZWw5NjgyNDU5NjY=",
      url:
        "https://api.github.com/repos/Beckon/base/labels/Status:%20Feature%20Testing",
      name: "Status: Feature Testing",
      color: "efec8d",
      default: false,
      description: "",
    },
    frontEndReivewRequired: {
      id: 949674599,
      node_id: "MDU6TGFiZWw5NDk2NzQ1OTk=",
      url:
        "https://api.github.com/repos/Beckon/base/labels/Status:%20Front%20End%20Review%20Needed%20:star:",
      name: "Status: Front End Review Needed :star:",
      color: "9b59b6",
      default: false,
      description: "",
    },
    javaReviewRequired: {
      id: 949636494,
      node_id: "MDU6TGFiZWw5NDk2MzY0OTQ=",
      url:
        "https://api.github.com/repos/Beckon/base/labels/Status:%20Java%20Review%20Needed%20:coffee:",
      name: "Status: Java Review Needed :coffee:",
      color: "2c3e50",
      default: false,
      description: "",
    },
    mergeConflict: {
      id: 954312818,
      node_id: "MDU6TGFiZWw5NTQzMTI4MTg=",
      url:
        "https://api.github.com/repos/Beckon/base/labels/Status:%20Merge%20Conflicts",
      name: "Status: Merge Conflicts",
      color: "d93f0b",
      default: false,
      description: "",
    },
    revisionNeeded: {
      id: 949886348,
      node_id: "MDU6TGFiZWw5NDk4ODYzNDg=",
      url:
        "https://api.github.com/repos/Beckon/base/labels/Status:%20Revision%20Needed%20:no_good_woman:",
      name: "Status: Revision Needed :no_good_woman:",
      color: "ee0000",
      default: false,
      description: "",
    },
  }),
);

export interface GitHubRepo {
  id: number; // 1296269,
  node_id: string; // "MDEwOlJlcG9zaXRvcnkxMjk2MjY5",
  name: string; // "Hello-World",
  full_name: string; // "octocat/Hello-World",
  owner: GitHubUser;
  private: boolean; // false,
  html_url: string; // "https://github.com/octocat/Hello-World",
  description: string; // "This your first repo!",
  fork: boolean; // false,
  url: string; // "https://api.github.com/repos/octocat/Hello-World",
  archive_url: string; // "http://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref}",
  assignees_url: string; // "http://api.github.com/repos/octocat/Hello-World/assignees{/user}",
  blobs_url: string; // "http://api.github.com/repos/octocat/Hello-World/git/blobs{/sha}",
  branches_url: string; // "http://api.github.com/repos/octocat/Hello-World/branches{/branch}",
  collaborators_url: string; // "http://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator}",
  comments_url: string; // "http://api.github.com/repos/octocat/Hello-World/comments{/number}",
  commits_url: string; // "http://api.github.com/repos/octocat/Hello-World/commits{/sha}",
  compare_url: string; // "http://api.github.com/repos/octocat/Hello-World/compare/{base}...{head}",
  contents_url: string; // "http://api.github.com/repos/octocat/Hello-World/contents/{+path}",
  contributors_url: string; // "http://api.github.com/repos/octocat/Hello-World/contributors",
  deployments_url: string; // "http://api.github.com/repos/octocat/Hello-World/deployments",
  downloads_url: string; // "http://api.github.com/repos/octocat/Hello-World/downloads",
  events_url: string; // "http://api.github.com/repos/octocat/Hello-World/events",
  forks_url: string; // "http://api.github.com/repos/octocat/Hello-World/forks",
  git_commits_url: string; // "http://api.github.com/repos/octocat/Hello-World/git/commits{/sha}",
  git_refs_url: string; // "http://api.github.com/repos/octocat/Hello-World/git/refs{/sha}",
  git_tags_url: string; // "http://api.github.com/repos/octocat/Hello-World/git/tags{/sha}",
  git_url: string; // "git:github.com/octocat/Hello-World.git",
  issue_comment_url: string; // "http://api.github.com/repos/octocat/Hello-World/issues/comments{/number}",
  issue_events_url: string; // "http://api.github.com/repos/octocat/Hello-World/issues/events{/number}",
  issues_url: string; // "http://api.github.com/repos/octocat/Hello-World/issues{/number}",
  keys_url: string; // "http://api.github.com/repos/octocat/Hello-World/keys{/key_id}",
  labels_url: string; // "http://api.github.com/repos/octocat/Hello-World/labels{/name}",
  languages_url: string; // "http://api.github.com/repos/octocat/Hello-World/languages",
  merges_url: string; // "http://api.github.com/repos/octocat/Hello-World/merges",
  milestones_url: string; // "http://api.github.com/repos/octocat/Hello-World/milestones{/number}",
  notifications_url: string; // "http://api.github.com/repos/octocat/Hello-World/notifications{?since,all,participating}",
  pulls_url: string; // "http://api.github.com/repos/octocat/Hello-World/pulls{/number}",
  releases_url: string; // "http://api.github.com/repos/octocat/Hello-World/releases{/id}",
  ssh_url: string; // "git@github.com:octocat/Hello-World.git",
  stargazers_url: string; // "http://api.github.com/repos/octocat/Hello-World/stargazers",
  statuses_url: string; // "http://api.github.com/repos/octocat/Hello-World/statuses/{sha}",
  subscribers_url: string; // "http://api.github.com/repos/octocat/Hello-World/subscribers",
  subscription_url: string; // "http://api.github.com/repos/octocat/Hello-World/subscription",
  tags_url: string; // "http://api.github.com/repos/octocat/Hello-World/tags",
  teams_url: string; // "http://api.github.com/repos/octocat/Hello-World/teams",
  trees_url: string; // "http://api.github.com/repos/octocat/Hello-World/git/trees{/sha}",
  clone_url: string; // "https://github.com/octocat/Hello-World.git",
  mirror_url: string; // "git:git.example.com/octocat/Hello-World",
  hooks_url: string; // "http://api.github.com/repos/octocat/Hello-World/hooks",
  svn_url: string; // "https://svn.github.com/octocat/Hello-World",
  homepage: string; // "https://github.com",
  language: null;
  forks_count: number; // 9,
  stargazers_count: number; // 80,
  watchers_count: number; // 80,
  size: number; // 108,
  default_branch: string; // "master",
  open_issues_count: number; // 0,
  topics: string[];
  has_issues: boolean; // true,
  has_projects: boolean; // true,
  has_wiki: boolean; // true,
  has_pages: boolean; // false,
  has_downloads: boolean; // true,
  archived: boolean; // false,
  pushed_at: string; // "2011-01-26T19:06:43Z",
  created_at: string; // "2011-01-26T19:01:12Z",
  updated_at: string; // "2011-01-26T19:14:43Z",
  permissions: {
    admin: boolean; // false,
    push: boolean; // false,
    pull: boolean; // true
  };
  allow_rebase_merge: boolean; // true,
  allow_squash_merge: boolean; // true,
  allow_merge_commit: boolean; // true,
  subscribers_count: number; // 42,
  network_count: number; // 0
}

export enum GitHubReviewState {
  APPROVED = "APPROVED",
  CHANGES_REQUESTED = "CHANGES_REQUESTED",
  PENDING = "PENDING",
}

export type GitHubReview = GetReviewsResponseItem;
