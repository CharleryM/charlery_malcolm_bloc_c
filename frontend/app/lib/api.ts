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

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const msg = data?.error || `API error (${res.status})`;
    throw new Error(msg);
  }

  return data;
}


export function getMe() {
  return authFetch("/users/me");
}

export function createTransaction(amount: number, type: string) {
  return authFetch(`/transaction/`, {
    method: "POST",
    body: JSON.stringify({ amount, type }),
  });
}