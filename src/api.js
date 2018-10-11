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

function getQueryString(params) {
  var esc = encodeURIComponent;
  return Object.keys(params)
    .map(k => `${esc(k)}=${esc(params[k])}`)
    .join('&');
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
  const data = { author: username }
  if (options.since) data.since = options.since
  if (options.until) data.until = options.until

  const payload = createPayload({
    body: JSON.stringify(data)
  })
  return fetchJSON(`${API}/repos/${username}/${repo}/commits`, payload)
}
