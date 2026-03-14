const BASE = "/api";

async function fetchJSON<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) => fetchJSON<T>(path),
  post: <T>(path: string, body: unknown) =>
    fetchJSON<T>(path, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    fetchJSON<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  del: <T>(path: string) => fetchJSON<T>(path, { method: "DELETE" }),
};
