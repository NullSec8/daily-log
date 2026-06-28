# Daily Log

Automated daily commit log powered by GitHub Actions.

Every day at **08:00, 14:00, 20:00 UTC**, a workflow appends a random quote, joke, and coding fact to `log.md` and commits it. A separate workflow creates and merges 1 PR to keep the contribution graph active.

## What's Inside

| File | Purpose |
|------|---------|
| `.github/workflows/daily.yml` | Cron job — commits a daily entry with random content |
| `.github/workflows/pr-achievements.yml` | Cron job — creates and merges 1 PR/day |
| `app/api/daily/route.js` | Vercel API endpoint for manual trigger (POST) |
| `log.md` | The accumulated daily log |

## Manual Trigger

```bash
curl -X POST https://daily-log.vercel.app/api/daily
```
