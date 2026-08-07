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

Average the score. Anything below 4 needs a fix or an explicit limitation.

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

## Pre-flight self-audit

Before declaring a pass, confirm: design read stated and matched; anti-default scan ran; motion motivated; one accent and one theme held; real content and previews; copy read once for AI-sounding filler; density or warmth appropriate to the profile; before/after evidence captured and re-scored.

## Screenshot naming

Use:

```text
face-it-<surface>-before.png
face-it-<surface>-after.png
```

Examples:

```text
face-it-dashboard-before.png
face-it-dashboard-after.png
face-it-mark-it-down-before.png
face-it-mark-it-down-after.png
```
