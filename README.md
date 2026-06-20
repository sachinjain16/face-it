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

1. Render the target UI.
2. Capture a before screenshot.
3. Inspect layout, spacing, theme, contrast, overflow, responsiveness, and state quality.
4. Fix visible defects.
5. Capture an after screenshot.
6. Report score, fixes, and any remaining limitations.

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

## References

- [Visual QA Checklist](references/VISUAL_QA_CHECKLIST.md)
- [Playwright Snippets](references/PLAYWRIGHT_SNIPPETS.md)

## License

MIT.
