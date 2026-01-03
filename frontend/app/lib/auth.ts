const API_URL = "http://localhost:3001";

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function register(userName: string, email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, email, password }),
  });

  if (!res.ok) throw new Error("Register failed");
  return res.json();
}

export async function authFetch(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include", 
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) throw new Error("API error");
  return res.json();
}

export function getMe() {
  return authFetch("/users/me"); 
}

export function createTransaction(amount: number, type: "debit" | "credit") {
  return authFetch("/transaction", {
    method: "POST",
    body: JSON.stringify({ amount, type }),
  });
}

export function deleteMe() {
  return authFetch("/users/me", {
    method: "DELETE",
  });
}

