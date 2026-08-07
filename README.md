# Face-It

Face-It is a Clawpilot skill for frontend visual QA. It makes rendered UI inspection a required part of dashboard, SPA, HTML artifact, and frontend-component work.

The operating rule is simple: **if the work has a face, look at it before calling it done.**

## Install from GitHub

Clone the repo:

```powershell
git clone https://github.com/sacjain_microsoft/face-it.git
cd face-it
```

Personal mirror:

```powershell
git clone https://github.com/sachinjain16/face-it.git
cd face-it
```

Install the skill:

```powershell
.\scripts\install.ps1
```

Restart Clawpilot, then verify the skill appears as:

```text
/face-it
```

## What it does

Face-It standardizes the frontend review loop:

1. State a one-line design read and pick a surface profile (operator dashboard through consumer/kids app).
2. Render the target UI and capture a before screenshot.
3. Inspect layout, spacing, theme, contrast, overflow, responsiveness, and state quality.
4. Scan for generic AI-default tells scoped to the profile.
5. Run an accessibility-lite pass, a state matrix for stateful surfaces, and a reference compare when a reference is provided.
6. Fix visible defects and capture an after screenshot.
7. Clear the pre-flight self-audit, then report score, fixes, and any remaining limitations.

## When to use

Use Face-It for:

- frontend design review
- UI polish
- dashboard polish
- screenshot review
- responsive layout checks
- HTML artifact review
- visual regression checks
- browser-based UI validation
- "does this look right?" asks

Face-It should also apply proactively before declaring visible UI work done.

## When not to use

Do not use Face-It as the main workflow for:

- backend-only work
- CLI-only tools
- pure data/model logic
- copywriting with no rendered UI
- documentation-only edits
- cases where browser rendering is impossible

## Output format

```text
Face-It pass: 4.4/5

Screenshots:
- face-it-dashboard-before.png
- face-it-dashboard-after.png

Fixed:
- spacing: KPI cards were crowded at desktop width.
- responsive: table clipped at narrow viewport.
- theme: replaced hardcoded gray with var(--cp-text-muted).

Remaining:
- None
```

## Face-It Doctor

Face-It includes a lightweight helper for HTML files and local URLs:

```powershell
npm install
npm run doctor -- .\artifact.html --surface dashboard
npm run doctor -- http://127.0.0.1:3000 --surface app-home
```

The doctor helper:

- scans standalone HTML for Clawpilot theme markers
- flags hardcoded non-theme colors
- checks expected typography and dark-mode markers
- captures desktop and narrow screenshots when Playwright is installed
- prints a scorecard stub for visual review

Screenshots are written to `face-it-output/`.

## References

- [Visual QA Checklist](references/VISUAL_QA_CHECKLIST.md)
- [Playwright Snippets](references/PLAYWRIGHT_SNIPPETS.md)

## License

MIT.
