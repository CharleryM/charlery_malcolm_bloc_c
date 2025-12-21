export async function getAssets() {
  const res = await fetch("http://localhost:3001/api/assets", { cache: "no-store" });
  return res.json();
}

export async function updateAsset(data) {
  const res = await fetch("http://localhost:3001/api/assets", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  });
  return res.json();
}
