const endpoint = '/data/about.md';

export default function getMarkdownText(): Promise<string | null> {
  return fetch(endpoint)
    .then((response) => {
      if (Math.floor(response.status / 100) !== 2) {
        throw new Error(response.statusText);
      }
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('text/markdown')) {
        throw new Error(response.statusText || 'Havent got a markdown');
      }
      return response.text();
    })
    .catch(() => null);
}
