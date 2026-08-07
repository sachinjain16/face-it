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

## Design read (before you render)

Mechanical QA alone cannot tell you whether a surface looks *right* — only whether it is broken. Before rendering, state a one-line design read so there is a target to score against, not just a checklist of defects.

State it in one line: **"Reading this as: <surface kind> for <audience>, expected register <register>."**

- **Surface kind**: operator dashboard, data table, admin console, SPA workflow, landing page, marketing site, portfolio, consumer product app, report artifact, or embedded widget.
- **Audience**: internal operator/analyst, executive, external customer, developer, or consumer/end user (including kids and families).
- **Register**: the expected feel — dense-and-restrained, clean-and-neutral, warm-and-inviting, playful-and-delightful, premium-and-quiet, or trust-first-and-plain.

If the design read genuinely diverges and you cannot infer it from context, ask exactly one clarifying question. If you can infer it, declare the read and proceed — do not stall on a question you can answer yourself.

The design read drives which surface profile applies and how strict the anti-default scan is. A dense operator console and a K-5 learning app are both "good" at opposite ends of the same dials; score each against its own profile, not one universal taste.

## Surface profiles

Pick the profile that matches the design read. Each sets the expected bar for three dials — **density**, **motion**, and **ornament** — plus the failure that matters most for that surface. These are expectations to score against, not automatic changes to make.

| Profile | Density | Motion | Ornament | Worst failure for this surface |
|---|---|---|---|---|
| Operator dashboard / console | high | low | low | Wasted space, weak scan-ability, decorative motion stealing focus |
| Data table / grid | high | none | none | Poor row rhythm, misaligned numerics, unreadable density |
| Executive view / report | medium | low | low-medium | Buried signal, no clear hierarchy of what matters |
| SaaS / product SPA | medium | medium | medium | Inconsistent components, unclear primary action |
| Marketing / landing | low-medium | medium-high | medium-high | Generic template look, no real hero, filler sections |
| Portfolio | low | medium | medium-high | Looks like everyone else's, no point of view |
| Consumer product app (incl. kids/family) | medium | medium-high | medium-high | Cold, clinical, or intimidating; no warmth or delight |
| Trust-first / regulated | medium | low | low | Anything that undercuts credibility or plain clarity |

When the surface is dense by design (operator console, data grid), do not flag high density as a defect — flag it only when density hurts scan-ability. When the surface is consumer or kid-facing, do not flag warmth, rounded shapes, or playful motion as noise — flag their absence.

## Anti-default scan

Beyond mechanical defects, scan for signs the UI defaulted to generic AI output instead of fitting its design read. Apply the ones relevant to the profile; do not force marketing rules onto an operator console.

- Generic AI accent (default purple/violet or generic AI-blue) used with no brand reason.
- Centered hero over a gradient blob with no real visual, used as a placeholder for actual content.
- Three equal feature cards as the reflex layout when the content does not call for it.
- `Inter`, `Geist`, or bare `system-ui` used as the default face when the surface or theme calls for something intentional.
- Decorative motion with no job — infinite loops, animations that do not communicate hierarchy, sequence, feedback, or state.
- Fake product chrome — div-built dashboards, fake terminals, or fake screenshots standing in for a real preview.
- Fabricated-precise numbers presented as real data with no source and no mock label.
- Register mismatch — a cold clinical layout for a warm consumer/kid surface, or playful ornament on a trust-first surface.
- One-accent and one-theme discipline broken: an accent that drifts across the page, or a section that flips light/dark mid-scroll without intent.

## Accessibility-lite pass

A visible-layer accessibility check. It catches renderable defects only and does not replace a full accessibility audit (screen-reader flows, deep ARIA semantics, keyboard-trap analysis). Say so when a11y comes up.

Gating: mandatory for consumer product (including kids/family) and trust-first/regulated profiles; recommended for all others. Skip only when the user asks for visual-only, and note the skip.

Checks, all from the rendered page:
- Text contrast meets a threshold (target 4.5:1 body, 3:1 for large text). Report the measured ratio and the failing element.
- Interactive elements show a visible focus indicator when tabbed to.
- Touch/click targets meet a minimum size (target 44x44 CSS px) on the narrow viewport.
- Images and icon-only buttons have a non-empty accessible name (alt text or aria-label).
- Body text is not below a legibility floor (flag under about 12px).
- State is not signaled by color alone (error/success also carries text or icon).

How to run: reuse the Playwright path. Read resolved foreground/background colors and compute contrast; read the accessibility tree for names; tab through a sample of interactive elements and screenshot the focused state.

Output: label `a11y:`, score category `accessibility` (1-5, folded into the average). Include the measured value where relevant, e.g. `a11y: contrast 2.8:1 on muted caption over card. Darken text to meet 4.5:1.`

## State matrix

Capture and inspect the non-happy states of stateful surfaces. Only states reachable from the running UI or a documented prop/route are captured; unreachable states are listed as un-inspected, never fabricated. Never edit app code to force a state; drive the UI or mock at the network boundary only.

Applies to: forms, drawers, modals, tables, cards, charts, preview panes, lists. Skip for purely static content.

States to attempt per surface: empty, loading, error, populated, selected/active, hover/focus, disabled.

How to trigger, in priority order: (1) a Storybook story or route/query param if one exists; (2) UI interaction (submit empty form, clear filters to force empty, hover/tab for interactive states); (3) a short-lived network mock via the browser context to force loading and error; (4) otherwise mark the state un-inspected.

Output: screenshots named `face-it-<surface>-state-<state>.png` and a small table listing each state as pass / fix / un-inspected. Findings use the `state:` label. A broken state lowers the `readiness` score.

## Reference compare

A judgment-assist compare against a provided reference, not a pixel-diff gate. It reports meaningful divergences (layout structure, spacing rhythm, type scale, color/accent, register) and never treats a legitimate responsive or theme adaptation as a defect. Do not emit a similarity percentage; that would be a fabricated number.

Fires when the user provides a reference: a pasted screenshot, an image path, a URL to emulate, or "match the previous version." Also usable as an after-vs-before self-compare to confirm a fix did not regress unrelated regions.

How to run: capture the target at the reference's viewport and aspect. If the reference is a URL, render it through the same Playwright path at the same viewport for a fair compare. Place reference and render side by side and assess against the design read: structural hierarchy, spacing family, type scale, accent, and register. Call out specific, actionable divergences.

Output: label `ref:`, a side-by-side capture named `face-it-<surface>-vs-reference.png`. Findings feed the `fit` score; a large unjustified divergence from an explicit reference lowers `fit`. Note responsive and theme adaptations as intentional rather than flagging them.

## Workflow

1. Identify the render target.
   - Existing app route, local HTML file, static artifact, Storybook story, or dev server URL.
   - If no render path exists, state that and provide the closest feasible validation.
   - State the design read and pick the surface profile before rendering.

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
   - anti-default scan against the surface profile (see Anti-default scan)
   - register fit: does the rendered result match the design read's expected register
   - accessibility-lite pass, gated by profile (see Accessibility-lite pass)
   - state matrix for stateful surfaces (see State matrix)
   - reference compare when a reference was provided (see Reference compare)

5. Score the result.
   Score each category 1-5:
   - hierarchy
   - spacing/density
   - responsiveness
   - theme/contrast
   - readiness
   - fit (matches the design read and surface profile)
   - accessibility (contrast, focus, target size, names) when the a11y-lite pass ran

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
- `default:` generic AI-default look or register mismatch against the surface profile
- `fit:` result does not match the stated design read (wrong density, motion, or register)
- `a11y:` visible accessibility defect (contrast, focus, target size, missing name, color-only signal)
- `ref:` diverges from a provided reference in a way not explained by responsive or theme adaptation

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

Design read: <surface kind> for <audience>, register <register>

Screenshots:
- face-it-<surface>-before.png
- face-it-<surface>-after.png
- face-it-<surface>-state-<state>.png (per captured state, when a state matrix ran)
- face-it-<surface>-vs-reference.png (when a reference compare ran)

States: <state: pass|fix|un-inspected, per state> (omit when no state matrix ran)

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

## Pre-flight self-audit

Run this gate before declaring a Face-It pass. Answer each item; if any fails, fix it or list it under Remaining before handoff. This is what separates "not broken" from "actually fits."

- Design read stated, and the rendered result matches its register and surface profile.
- Anti-default scan ran, and any generic-AI tells relevant to the profile are fixed or called out.
- Motion (if present) is motivated — every animation communicates hierarchy, sequence, feedback, or state, not decoration.
- One accent and one theme held across the surface; no drift, no unintended mid-scroll theme flip.
- Real content and real previews — no fake chrome, no fabricated-precise numbers presented as real.
- Visible copy read once for broken grammar, unclear referents, or AI-sounding filler.
- For dense surfaces, density serves scan-ability; for consumer/kid surfaces, warmth and clarity are present, not stripped.
- Accessibility-lite pass ran where the profile requires it, or was explicitly skipped with a reason; contrast, focus, and target-size failures are fixed or listed.
- For stateful surfaces, each applicable state was captured or marked un-inspected, and broken states are fixed or listed.
- When a reference was provided, the render was compared against it and material divergences are fixed or listed, with responsive/theme adaptations noted as intentional.
- Before/after evidence captured (or the render blocker stated), and the surface re-scored after fixes.

## Exit criteria

A Face-It task is done when:
- the relevant UI rendered successfully, or the render blocker is clearly stated
- screenshots or equivalent rendered evidence were captured when feasible
- the accessibility-lite pass ran where the profile requires it, or the skip is stated
- stateful surfaces had their states captured or marked un-inspected
- a provided reference was compared against and divergences fixed or listed
- visible issues were fixed or explicitly listed
- the final state was rechecked
- the response names the meaningful visual outcome, not the tool mechanics

## References

- [Visual QA Checklist](references/VISUAL_QA_CHECKLIST.md)
- [Playwright Snippets](references/PLAYWRIGHT_SNIPPETS.md)
