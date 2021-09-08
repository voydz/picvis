export async function postJson(url, data) {
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export function getTimestamp() {
  return Math.floor(Date.now() / 1000)
}

export function formatDate(timestamp) {
  return (new Date(timestamp * 1000)).toLocaleString();
}
