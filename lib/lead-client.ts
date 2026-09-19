type Fetcher = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

export async function submitDriverApplication(
  payload: Record<string, unknown>,
  fetcher: Fetcher = fetch,
) {
  const response = await fetcher('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return response.ok;
}
