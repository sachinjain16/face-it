# Visual QA Checklist

Use this checklist when Face-It is active.

## Design read (state before rendering)

One line: **"Reading this as: <surface kind> for <audience>, register <register>."** Then pick the surface profile below and score against it, not against one universal taste.

| Profile | Density | Motion | Ornament | Worst failure |
|---|---|---|---|---|
| Operator dashboard / console | high | low | low | Wasted space, weak scan-ability, decorative motion |
| Data table / grid | high | none | none | Poor row rhythm, misaligned numerics, unreadable density |
| Executive view / report | medium | low | low-medium | Buried signal, no hierarchy of what matters |
| SaaS / product SPA | medium | medium | medium | Inconsistent components, unclear primary action |
| Marketing / landing | low-medium | medium-high | medium-high | Generic template look, no real hero, filler |
| Portfolio | low | medium | medium-high | Looks generic, no point of view |
| Consumer product app (incl. kids/family) | medium | medium-high | medium-high | Cold or intimidating; no warmth or delight |
| Trust-first / regulated | medium | low | low | Anything that undercuts credibility or plain clarity |

## Required checks

| Area | Check |
|---|---|
| Layout | Clear hierarchy, stable grid, aligned sections, no accidental imbalance |
| Spacing | Consistent padding/margins, no cramped cards, no awkward dead space |
| Overflow | No clipping, no unexpected horizontal scroll, no hidden controls |
| Responsive | Desktop and narrow viewport render acceptably unless desktop-only |
| Theme | Correct light/dark behavior and project theme variables |
| Contrast | Text, buttons, labels, and charts remain readable |
| Typography | Consistent font, weight, size, line-height, and truncation behavior |
| Affordance | Buttons, tabs, links, filters, cards, and controls look interactive |
| State | Empty/loading/error/selected/disabled states are not visually broken |
| Charts | Labels, axes, legends, colors, and tooltips are readable |
| Console | No browser errors that affect visible UI |
| Anti-default | No generic-AI tells for the profile; result fits the design read's register |

## Anti-default scan

Apply the items relevant to the surface profile; do not force marketing rules onto an operator console.

- Generic AI accent (default purple/violet or generic AI-blue) with no brand reason.
- Centered hero over a gradient blob with no real visual, used as a placeholder.
- Three equal feature cards as a reflex layout the content does not call for.
- `Inter`, `Geist`, or bare `system-ui` as the default face when the theme calls for something intentional.
- Decorative motion with no job (infinite loops, motion that communicates nothing).
- Fake product chrome: div-built dashboards, fake terminals, fake screenshots.
- Fabricated-precise numbers presented as real data with no source and no mock label.
- Register mismatch: cold/clinical for a warm consumer or kid surface; playful ornament on a trust-first surface.
- Broken one-accent / one-theme discipline: drifting accent, or a section flipping light/dark mid-scroll without intent.

## Scorecard

Score each category from 1 to 5:

- hierarchy
- spacing/density
- responsiveness
- theme/contrast
- readiness
- fit (matches the design read and surface profile)
- accessibility (when the a11y-lite pass ran)

Average the score. Anything below 4 needs a fix or an explicit limitation.

## Accessibility-lite pass

Visible-layer only; not a full audit. Mandatory for consumer/kids and trust-first profiles, recommended otherwise. Checks: text contrast (target 4.5:1 body, 3:1 large), visible focus indicator on tab, target size (target 44x44 CSS px on narrow), non-empty accessible names on images and icon-only buttons, body text not below ~12px, state not signaled by color alone. Report measured values. Label `a11y`.

## State matrix

For stateful surfaces (forms, drawers, modals, tables, cards, charts, preview panes, lists): attempt empty, loading, error, populated, selected/active, hover/focus, disabled. Trigger via Storybook/route, UI interaction, or a network mock; otherwise mark un-inspected. Never edit app code to force a state. Capture `face-it-<surface>-state-<state>.png` and report each state as pass / fix / un-inspected. Label `state`.

## Reference compare

Judgment-assist, not pixel-diff; no similarity percentage. When a reference (screenshot, image path, URL, or prior version) is given, capture the target at the reference viewport, place side by side, and report divergences in structure, spacing rhythm, type scale, accent, and register. Note responsive/theme adaptations as intentional. Capture `face-it-<surface>-vs-reference.png`; feeds the `fit` score. Label `ref`.

## Issue taxonomy

Use these labels:

- `layout`
- `spacing`
- `overflow`
- `responsive`
- `theme`
- `contrast`
- `type`
- `affordance`
- `state`
- `chart`
- `console`
- `default`
- `fit`
- `a11y`
- `ref`

## Pre-flight self-audit

Before declaring a pass, confirm: design read stated and matched; anti-default scan ran; motion motivated; one accent and one theme held; real content and previews; copy read once for AI-sounding filler; density or warmth appropriate to the profile; accessibility-lite pass ran where required (or skip stated); stateful surfaces had states captured or marked un-inspected; any provided reference compared and divergences resolved; before/after evidence captured and re-scored.

## Screenshot naming

Use:

```text
face-it-<surface>-before.png
face-it-<surface>-after.png
face-it-<surface>-state-<state>.png
face-it-<surface>-vs-reference.png
```

Examples:

```text
face-it-dashboard-before.png
face-it-dashboard-after.png
face-it-dashboard-state-empty.png
face-it-dashboard-state-error.png
face-it-landing-vs-reference.png
```
