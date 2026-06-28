"use client";

import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function triggerLog() {
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/daily", { method: "POST" });
      const data = await res.json();
      setStatus(data.ok ? `✅ Logged — ${data.date}` : `❌ ${data.error}`);
    } catch {
      setStatus("❌ Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem", maxWidth: 600 }}>
      <h1>Daily Log</h1>
      <p>Automated daily commit log powered by GitHub Actions.</p>
      <p>A cron job commits an entry at 08:00, 14:00, and 20:00 UTC every day.</p>
      <button
        onClick={triggerLog}
        disabled={loading}
        style={{
          padding: "0.5rem 1.5rem",
          fontSize: "1rem",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Logging..." : "Trigger Log Now"}
      </button>
      {status && <p style={{ marginTop: "1rem" }}>{status}</p>}
    </main>
  );
}
