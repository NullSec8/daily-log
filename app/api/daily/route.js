import { Octokit } from "octokit";

export const dynamic = "force-dynamic";

export async function GET() {
  const token = process.env.GH_TOKEN;
  if (!token) {
    return Response.json({ error: "GH_TOKEN not set" }, { status: 500 });
  }

  const octokit = new Octokit({ auth: token });
  const owner = process.env.GH_OWNER;
  const repo = process.env.GH_REPO || "daily-log";
  const today = new Date().toISOString().slice(0, 10);

  const messages = [
    "Daily update",
    "End of day log",
    "Today's entry",
    "Logging in",
    "Daily report",
  ];
  const msg = messages[Math.floor(Math.random() * messages.length)];

  const content = `# Daily Log\n\n## ${today}\n\n- ${msg} at ${new Date().toLocaleTimeString()}\n`;

  let sha;
  try {
    const existing = await octokit.repos.getContent({ owner, repo, path: "log.md" });
    sha = existing.data.sha;
  } catch {}

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: "log.md",
    message: `${msg} ${today}`,
    content: Buffer.from(content).toString("base64"),
    sha,
  });

  return Response.json({ ok: true, date: today });
}
