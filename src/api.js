const API = 'https://api.github.com'
const baseOptions = {
  headers: {
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  }
};

async function fetchJSON(url, options) {
  const response = await fetch(url, options)
  if (response.ok) {
    return await response.json()
  }
  throw new Error(`Status ${response.status} (${response.statusText})`)
}

export function fetchRepositories(username, options=baseOptions) {
  return fetchJSON(`${API}/users/${username}/repos`, options)
}

export function fetchCommits(username, repo='commit-viewer', options=baseOptions) {
  return fetchJSON(`${API}/repos/${username}/${repo}/commits`, options)
}
