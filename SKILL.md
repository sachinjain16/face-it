---
name: face-it
description: Use this skill whenever the user asks for Face-It, frontend design review, visual QA, UI polish, screenshot review, responsive layout checks, pixel/design fit, dashboard polish, artifact preview, browser-based UI validation, or asks whether a frontend/app/artifact 'looks right'. Also proactively apply before declaring frontend, dashboard, SPA, or HTML artifact work done. Do NOT use for backend-only work, pure copywriting, data analysis without UI, or when browser/screenshot validation is impossible.
---

# Face-It

Frontend visual QA mode for Clawpilot. Face-It means: if the work has a face, look at it before calling it done.

## Activation model

Face-It is **not always-on**, but it is **always considered** for visible UI work.

Use Face-It when the user says or implies:
- Face-It
- frontend design review
- visual QA
- UI polish
- screenshot review
- does this look right
- dashboard polish
- artifact preview
- responsive layout check
- browser validation
- visual regression
- pixel fit
- layout issue
- design pass
- SPA polish
- HTML artifact review

Also apply it proactively before declaring done for:
- dashboards
- SPAs
- frontend components
- landing pages
- HTML artifacts
- report artifacts
- visual prototypes
- forms, drawers, modals, navigation, cards, tables, charts, or preview panes

Do **not** use as primary workflow for:
- backend-only changes
- CLI-only tools
- pure data/model logic
- copywriting with no rendered UI
- documentation-only edits
- cases where a browser cannot reasonably render the target

## Core rule

Frontend work is not done until it has been rendered, inspected, and any visible defects have been addressed or explicitly called out.

## Workflow

1. Identify the render target.
   - Existing app route, local HTML file, static artifact, Storybook story, or dev server URL.
   - If no render path exists, state that and provide the closest feasible validation.

2. Start or open the target.
   - Use the project's existing dev command if needed.
   - Prefer a temporary local server for standalone HTML artifacts.
   - Do not create new build/test tooling just for Face-It.

3. Capture the first look.
   - Use browser automation when available.
   - Screenshot naming: `face-it-<surface>-before.png`.
   - Capture only after the page is loaded enough to inspect.
   - Inspect the rendered page, not just DOM or source code.

4. Run the visual QA checklist.
   - layout balance and hierarchy
   - spacing consistency
   - overflow, clipping, and horizontal scroll
   - desktop and narrow viewport when relevant
   - contrast and theme correctness
   - typography consistency
   - empty/loading/error states when visible
   - button/link affordance
   - table/card/chart readability
   - console errors that visibly affect UI
   - Clawpilot theme variables for artifacts

5. Score the result.
   Score each category 1-5:
   - hierarchy
   - spacing/density
   - responsiveness
   - theme/contrast
   - readiness

   Overall score is the average. Scores below 4 need a fix or an explicit limitation.

6. Fix visible defects.
   - Make the smallest safe UI change that improves the rendered result.
   - Preserve app behavior.
   - Do not redesign unrelated surfaces.

7. Recapture final evidence.
   - Reload the page.
   - Screenshot naming: `face-it-<surface>-after.png`.
   - Re-score after fixes.
   - Report remaining known visual limitations if any.

## Visual issue taxonomy

Use these labels for findings:
- `layout:` hierarchy, alignment, composition, grid, whitespace
- `spacing:` inconsistent padding/margins, cramped sections, density problems
- `overflow:` clipping, hidden content, horizontal scroll, viewport spill
- `responsive:` broken narrow/desktop behavior
- `theme:` wrong colors, hardcoded colors, dark/light mismatch
- `contrast:` weak readability or insufficient text/background separation
- `type:` font, size, weight, line-height, truncation
- `affordance:` unclear buttons, links, tabs, cards, controls
- `state:` missing/weak loading, empty, error, selected, disabled, hover states
- `chart:` unreadable labels, legends, axes, tooltips, color semantics
- `console:` visible UI issue caused by runtime/browser errors

## Review output

For visual review findings, use:

```text
<surface>: <tag>: <issue>. <fix>.
```

If clean:

```text
Face-It pass: rendered cleanly. Ship.
```

## Final handoff format

Use this when Face-It materially influenced the task:

```text
Face-It pass: <score>/5

Screenshots:
- face-it-<surface>-before.png
- face-it-<surface>-after.png

Fixed:
- <tag>: <visual issue fixed>

Remaining:
- <known visual limitation or "None">
```

If no screenshots were possible, replace `Screenshots` with:

```text
Rendered check: <what was inspected and why screenshots were unavailable>
```

## Artifact-specific rules

For Clawpilot HTML artifacts:
- Include the required theme detection script.
- Use `--cp-*` variables for all colors.
- Use Segoe UI/Aptos typography.
- Avoid hardcoded non-theme colors.
- Prefer a screenshot or browser snapshot before final handoff.

### Artifact theme scanner

When reviewing standalone HTML artifacts, scan for:
- missing `clawpilotTheme` detection
- missing `--cp-*` variables
- hardcoded non-theme hex/rgb/hsl colors
- Inter/Geist/system-ui as primary font
- purple/teal/generic AI-blue accent styling
- heavy glassmorphism or excessive shadows
- missing dark-mode support

If the scanner finds issues, fix them before visual polish unless the user explicitly wants a non-Clawpilot artifact.

## Responsive pass

For dashboards, SPAs, and artifacts, check at least:
- desktop viewport
- narrow/mobile-ish viewport

Skip narrow viewport only when the surface is explicitly desktop-only and say so.

## Local artifact server helper

For standalone HTML files:
1. Serve the containing folder with a temporary local server.
2. Open the artifact through HTTP, not `file://`, if browser tooling blocks file access.
3. Stop the server when done.
4. Do not leave background servers running unless the user asked for it.

## Safety boundaries

Face-It does not replace:
- functional tests
- accessibility audits
- security review
- performance profiling
- product strategy review

It catches visible defects and design quality gaps. If a visual fix might affect data, auth, routing, persistence, or privacy, stop and inspect the code path before changing it.

## Relationship to other skills

- Face-It = visual/frontend QA loop.
- Signal-It = concise communication.
- Code-Chief/AADIT = simplify engineering scope.
- Web Artifacts Builder = create HTML artifacts with Clawpilot theme.

These can combine. Example: Web Artifacts Builder creates the artifact, Face-It reviews the rendered result, Signal-It summarizes the outcome, and Code-Chief keeps the fix small.

## Exit criteria

A Face-It task is done when:
- the relevant UI rendered successfully, or the render blocker is clearly stated
- screenshots or equivalent rendered evidence were captured when feasible
- visible issues were fixed or explicitly listed
- the final state was rechecked
- the response names the meaningful visual outcome, not the tool mechanics

## References

- [Visual QA Checklist](references/VISUAL_QA_CHECKLIST.md)
- [Playwright Snippets](references/PLAYWRIGHT_SNIPPETS.md)
