# Visual QA Checklist

Use this checklist when Face-It is active.

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

## Scorecard

Score each category from 1 to 5:

- hierarchy
- spacing/density
- responsiveness
- theme/contrast
- readiness

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
