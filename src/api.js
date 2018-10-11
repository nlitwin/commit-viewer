const API = 'https://api.github.com'
const baseHeaders = {
  headers: {
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  }
};

function createPayload(options={}) {
  return Object.assign({}, baseHeaders, options)
}

async function fetchJSON(url, options) {
  const response = await fetch(url, options)
  if (response.ok) {
    return await response.json()
  }
  throw new Error(`Status ${response.status} (${response.statusText})`)
}

export function fetchRepositories(username, options=baseHeaders) {
  return fetchJSON(`${API}/users/${username}/repos`, options)
}

export function fetchCommits(username, repo, options=baseHeaders) {
  return fetchJSON(`${API}/repos/${username}/${repo}/commits`, options)
}
