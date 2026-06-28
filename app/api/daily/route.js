import { Octokit } from "octokit";

export const dynamic = "force-dynamic";

export async function POST() {
  const token = process.env.GH_TOKEN;
  const owner = process.env.GH_OWNER;
  const repo = process.env.GH_REPO || "daily-log";

  if (!token || !owner) {
    return Response.json({ error: "Missing GH_TOKEN or GH_OWNER" }, { status: 500 });
  }

  const octokit = new Octokit({ auth: token });
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const time = now.toLocaleTimeString();

  const messages = [
    "Daily update",
    "End of day log",
    "Today's entry",
    "Logging in",
    "Daily report",
  ];
  const msg = messages[Math.floor(Math.random() * messages.length)];
  const content = `# Daily Log\n\n## ${today}\n\n- ${msg} at ${time}\n`;

  let sha;
  try {
    const existing = await octokit.repos.getContent({ owner, repo, path: "log.md" });
    sha = existing.data.sha;
  } catch {}

  try {
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: "log.md",
      message: `${msg} ${today}`,
      content: Buffer.from(content).toString("base64"),
      sha,
    });
  } catch (err) {
    return Response.json({ error: "GitHub write failed", detail: err.message }, { status: 502 });
  }

  return Response.json({ ok: true, date: today });
}
