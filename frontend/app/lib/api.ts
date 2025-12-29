const API_URL = "http://localhost:3001";

export async function authFetch(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error("API error");
  }

  return res.json();
}


export function getMe() {
  return authFetch("/me");
}

export function createTransaction(userId: string, amount: number, type: string) {
  return authFetch(`/transaction/${userId}`, {
    method: "POST",
    body: JSON.stringify({ amount, type }),
  });
}