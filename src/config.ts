const GITHUB_TOKEN_API = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN_API) {
  throw new Error(
    `GITHUB TOKEN NOT FOUND: SET export GITHUB_TOKEN="your token"`,
  );
}

export default GITHUB_TOKEN_API;
