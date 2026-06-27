export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui", padding: "2rem" }}>
      <h1>GitHub Daily Automation</h1>
      <p>This app runs a daily cron job that commits a log to your GitHub repo.</p>
      <p>
        Trigger manually: <a href="/api/daily">/api/daily</a>
      </p>
    </main>
  );
}
