const BASE = "/api";
const DEFAULT_TIMEOUT = 30_000;

async function fetchJSON<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      ...init,
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      let msg = `API ${res.status}: ${res.statusText}`;
      try { const j = JSON.parse(body); if (j.error) msg = j.error; } catch {}
      throw new Error(msg);
    }
    return res.json() as Promise<T>;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new Error("Request timed out — server may be busy");
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

export const api = {
  get: <T>(path: string) => fetchJSON<T>(path),
  post: <T>(path: string, body: unknown) =>
    fetchJSON<T>(path, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    fetchJSON<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  del: <T>(path: string) => fetchJSON<T>(path, { method: "DELETE" }),
  patch: <T>(path: string, body: unknown) =>
    fetchJSON<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
};
